const Delimiter = require('../delimiter');

class Protocol {
  constructor(client) {
    /**
     * Client that instantiated this protocol
     * @type {Client}
     * @public
     */
    this.client = client;

    /**
     * Local handlers
     * @type {Object}
     * @protected
     */
    this.localHandlers = {};

    /**
     * Remote handlers
     * @type {Object}
     * @protected
     */
    this.remoteHandlers = {};

    /**
     * Local packet delimiter
     * @type {string}
     * @public
     */
    this.localDelimiter = new Delimiter(this);

    /**
     * Remote packet delimiter
     * @type {string}
     * @public
     */
    this.remoteDelimiter = new Delimiter(this);
  }

  /**
   * Returns the logger instance
   * @readonly
   */
  get logger() {
    return this.client.server.logger;
  }

  /**
   * Connection type
   * @returns {Object}
   * @readonly
   */
  get type() {
    return {
      LOCAL: 0,
      REMOTE: 1,
    };
  }

  /**
   * Packet types
   * @returns {Object}
   * @readonly
   */
  get packetType() {
    return {
      XML: 0,
      XT: 1,
      JSON: 2,
      UNDEFINED: 3,
    };
  }

  /**
   * Handles incoming/outgoing packets
   * @param {number} type Packet type
   * @param {Packet} packet Incoming/outgoing packet
   */
  handle(type, packet) {
    switch (type) {
      case this.type.LOCAL:
        if (this.localHandlers[packet.type]) this.localHandlers[packet.type].handle(packet);
        break;

      case this.type.REMOTE:
        if (this.remoteHandlers[packet.type]) this.remoteHandlers[packet.type].handle(packet);
        break;
    }
  }

  /**
   * Handles incoming  packets and fires the events
   * @param {number} type Incoming/outgoing type
   * @param {string} packet Outgoing packet
   */
  parseAndFire(type, packet) {
    const toPacket = this.constructPacket(packet);

    if (toPacket) {
      toPacket.parse();

      this.handle(type, toPacket);

      if (type === this.type.LOCAL) this.client.server.plugins.fireLocalHooks(this.client, toPacket);
      else this.client.server.plugins.fireRemoteHooks(this.client, toPacket);

      if (toPacket.send) {
        if (type === this.type.LOCAL) this.remote(toPacket);
        else this.local(toPacket);
      }
    }
  }

  /**
   * Regsiters a local handler
   * @param {string|number} event Event type
   * @param {Handler} handler Handler to regsiter
   */
  regsiterLocalHandler(event, handler) {
    this.localHandlers[event] = new handler(this);
  }

  /**
   * Regsiters a remote handler
   * @param {string|number} event Event type
   * @param {Handler} handler Handler to regsiter
   */
  regsiterRemoteHandler(event, handler) {
    this.remoteHandlers[event] = new handler(this);
  }

  /**
   * Writes to the remote connection
   * @param {any} packet Packet to write
   * @abstract
   */
  remote() {
    throw new Error('Method not implemented.');
  }

  /**
   * Writes to the local connection
   * @param {any} packet Packet to write
   * @abstract
   */
  local() {
    throw new Error('Method not implemented.');
  }

  /**
   * Constructs the local packet
   * @param {string} packet Packet to construct
   * @abstract
   */
  constructPacket() {
    throw new Error('Method not implemented.');
  }

  /**
   * Called on incoming/outgoing packet
   * @param {string} packet Packet to handle
   * @public
   */
  onPacket() {
    throw new Error('Method not implemented.');
  }
}

module.exports = Protocol;
