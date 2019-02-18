const { CONNECTION_STATE, PROTOCOL_TYPE } = require('../util/Constants');
const AdventureQuestWorlds = require('./protocol/AdventureQuestWorlds');
const AdventureQuest3D = require('./protocol/AdventureQuest3D');
const PromiseSocket = require('promise-socket');
const Player = require('../game/Player');
const State = require('../game/State');

class Client {
  constructor(server, socket) {
    /**
     * Server that instantiated this client
     * @type {TCPServer}
     * @public
     */
    this.server = server;

    /**
     * Socket that instantiated this client
     * @type {net.Socket}
     * @public
     */
    this.socket = socket;
    this.socket.setEncoding('binary');

    /**
     * Remote connection
     * @type {?net.Socket}
     * @private
     */
    this.remote = null;

    /**
     * Connection state
     * @type {number}
     * @public
     */
    this.connectionState = CONNECTION_STATE.IDLE;

    /**
     * Network protocol
     * @type {Protocol}
     * @public
     */
    this.protocol = this.server.protocol === PROTOCOL_TYPE.AQW ?
      new AdventureQuestWorlds(this) : new AdventureQuest3D(this);

    /**
     * Intervals set
     * @type {Set<Timeout>}
     * @private
     */
    this._intervals = new Set();

    /**
     * Client state store
     * @type {State}
     * @public
     */
    this.state = new State();

    /**
     * Player of this client
     * @type {?Player}
     * @public
     */
    this.player = null;
  }

  /**
   * Creates a new player instance
   * @param {Object} information Information of the player
   * @param {string} token Authentication token of the player
   */
  constructPlayer(information) {
    if (this.player === null) this.player = new Player(this, information);
  }

  /**
   * Attempts connection to the remote host
   * @returns {Promise<void>}
   */
  async connect() {
    try {
      this.remote = new PromiseSocket();
      this.remote.setEncoding('binary');

      const { host, port } = this.server.remote;
      await this.remote.connect({ host, port });
      this.connectionState = CONNECTION_STATE.CONNECTED;

      this._init();
      this.remote.stream.on('data', data => this.protocol.remoteDelimiter.chuck(this.protocol.type.REMOTE, data));
      this.remote.stream.once('close', () => this.disconnect());
    } catch (error) {
      this.server.logger.error(`Failed connecting to the remote host.. Reason: ${error.message}`);
    }
  }

  /**
   * Initialize the socket events
   * @private
   */
  _init() {
    this.socket.stream.on('data', data => this.protocol.localDelimiter.chuck(this.protocol.type.LOCAL, data));
    this.socket.stream.once('close', () => this.disconnect());
  }

  /**
   * Sends the packet to the server
   * @param {Packet} packet Packet to send
   * @returns {Promise<void>}
   * @public
   */
  remoteWrite(packet) {
    return this.protocol.remote(packet);
  }

  /**
   * Sends the packet to the server
   * @param {Packet} packet Packet to send
   * @returns {Promise<void>}
   * @public
   */
  localWrite(packet) {
    return this.protocol.local(packet);
  }

  /**
   * Sends command not found message to the client
   * @param {string} command Command that wasn't found
   * @returns {Promise<void>}
   * @public
   */
  commandNotFound(command) {
    return this.warning(`Command ${command} not found!`);
  }

  /**
   * Sends a server warning message
   * @param {string} message Message to send
   * @returns {Promise<void>}
   * @public
   */
  warning(message) {
    return this.protocol.warning(message);
  }

  /**
   * Sends a server message
   * @param {string} message Message to send
   * @returns {Promise<void>}
   * @public
   */
  general(message) {
    return this.protocol.general(message);
  }


  /**
   * Sets an interval
   * @param {Function} fn Function to execute
   * @param {*} delay Time to wait between executions
   * @param  {...any} args Arguments for the function
   * @returns {Timeout}
   */
  setInterval(fn, delay, ...args) {
    const interval = setInterval(fn, delay, ...args);
    this._intervals.add(interval);
    return interval;
  }

  /**
   * Clears an interval
   * @param {Timeout} interval Interval to cancel
   * @public
   */
  clearInterval(interval) {
    clearInterval(interval);
    this._intervals.clear(interval);
  }

  /**
   * Handles disconnection
   * @public
   */
  async disconnect() {
    if (this.connectionState === CONNECTION_STATE.CONNECTED) {
      this.connectionState = CONNECTION_STATE.DISCONNECTED;
      await this.remote.end();
      await this.socket.end();
      this._destroy();
      this.server.removeConnection(this);
    }
  }

  /**
   * Distorys the sockets
   * @returns {Promise<void>}
   * @private
   */
  async _destroy() {
    await this.remote.destroy();
    await this.socket.destroy();

    for (const interval of this._intervals) this.clearInterval(interval);
    this._intervals.clear();
  }
}

module.exports = Client;
