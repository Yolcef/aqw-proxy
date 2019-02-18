const childProcess = require('child_process');
const { EventEmitter } = require('events');
const { PROCESS_EVENTS } = require('../util/Constants');

class Process extends EventEmitter {
  constructor(file) {
    super();

    /**
     * File path of the spawner
     * @type {string}
     * @private
     */
    this._file = file;

    /**
     * Process of the server
     * @type {?childProcess}
     * @private
     */
    this._process = null;
  }

  /**
   * Returns the server list
   * @readonly
   * @returns {Map}
   */
  static get serverList() {
    return SERVER_LIST;
  }

  /**
   * Forks a child process
   * @returns {Promise<void>}
   */
  spawn() {
    return new Promise((resolve, reject) => {
      if (this._process) reject(new Error('Process already exsists.'));

      this._process = childProcess.fork(this._file)
        .on('message', message => this._onMessage(message))
        .once('error', error => reject(error));
      resolve();
    });
  }

  /**
   * Handles messages from the child process
   * @param {Object} message Message from the child process
   * @private
   */
  _onMessage(message) {
    switch (message.type) {
      case PROCESS_EVENTS.SERVER_ADD:
        this._addServer(message);
        break;

      case PROCESS_EVENTS.UPDATE_SERVER:
        this._updateServer(message.name, message.update);
        break;
    }
  }

  /**
   * Adds a server to the server list for the parent process
   * @param {Object} server Server object
   */
  _addServer(server) {
    if (!SERVER_LIST.has(server.name)) SERVER_LIST.set(server.name, server);
  }

  /**
   * Updates a server for the parent process
   * @param {string} name Server name
   * @param {Object} param Update key/value
   */
  _updateServer(name, { key, value }) {
    if (SERVER_LIST.has(name)) {
      let serverObject = SERVER_LIST.get(name);
      serverObject[key] = value;
      SERVER_LIST.set(name, serverObject);
    }
  }


  /**
   * Sends data to the child process
   * @param {Object} data Data to send
   * @returns {Promise<void>}
   * @public
   */
  send(data = {}) {
    return new Promise((resolve, reject) => {
      this._process.send(data, error => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

/**
 * Stores the current listening servers for parent process
 * @type {Set<Object>}
 * @private
 */
const SERVER_LIST = new Map();

module.exports = Process;

