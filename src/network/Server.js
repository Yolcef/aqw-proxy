const { EventEmitter } = require('events');
const { createServer } = require('net');
const { EVENTS, PROCESS_EVENTS } = require('../util/Constants');
const PluginManager = require('../plugin/PluginManager');
const PromiseSocket = require('promise-socket');
const logger = require('../logger');
const Client = require('./Client');

class TCPServer extends EventEmitter {
  constructor(server) {
    super();

    Object.assign(this, server);

    /**
     * Server connection
     * @type {?net.Socket}
     * @private
     */
    this._server = null;

    /**
     * Plugin manager
     * @type {PluginManager}
     * @public
     */
    this.plugins = new PluginManager(this);
    this.plugins.loadAll();

    /**
     * Handles all connected connections
     * @type {Map<Client>}
     * @public
     */
    this.connections = new Set();

    /**
     * Player count
     * @type {number}
     * @public
     */
    this.count = 0;
  }

  get logger() {
    return logger;
  }

  /**
   * Spawns the server and gets the information from the configuration file
   * @param {Array} servers Servers to spawn
   * @returns {TCPServer}
   * @static
   */
  static spawn() {
    const server = Config.get('server');
    const tcpServer = new TCPServer(server, this);
    return tcpServer.listen();
  }

  /**
   * Create socket and begin listening for new connections
   * @returns {Promise<void>}
   * @public
   */
  listen() {
    return new Promise((resolve, reject) => {
      if (this._server) reject(new Error('The server has already been instantiated.'));

      this._server = createServer(socket => this._onConnection(socket))
        .once('listening', () => {
          this.sendProcess({
            type: PROCESS_EVENTS.SERVER_ADD,
            name: this.name,
            port: this.port,
            count: this.count,
          });
          resolve();
        })
        .once('error', error => reject(error));

      this._server.listen(this.port);
    });
  }

  /**
   * Handles new incoming connections
   * @param {net.Socket} socket Connection socket
   */
  async _onConnection(socket) {
    socket = new PromiseSocket(socket);

    const client = new Client(this, socket);
    await client.connect();

    this.connections.add(client);
    this.count++;

    this.emit(EVENTS.NEW_CONNECTION, client);
    this.sendProcess({
      type: PROCESS_EVENTS.UPDATE_SERVER,
      name: this.name,
      update: {
        key: 'count',
        value: this.count,
      },
    });
  }

  /**
   * Sends data to the parent process
   * @param {Object} data Data to send
   * @returns {Promise<void>}
   * @public
   */
  sendProcess(data = {}) {
    return new Promise((resolve, reject) => {
      process.send(data, error => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  /**
   * Removes the client from the connections map
   * @param {Client} client Client to remove
   */
  removeConnection(client) {
    if (this.connections.has(client)) {
      this.connections.delete(client);
      this.count -= 1;

      this.emit(EVENTS.CONNECTION_REMOVED, client);
      this.sendProcess({
        type: PROCESS_EVENTS.UPDATE_SERVER,
        name: this.name,
        update: {
          key: 'count',
          value: this.count,
        },
      });
    }
  }
}

module.exports = TCPServer;
