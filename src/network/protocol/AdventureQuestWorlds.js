const { CONNECTION_STATE, ADVENTUREQUEST_WORLDS_PACKETS } = require('../../util/Constants');
const JsonPacket = require('./packets/aqw/JsonPacket');
const XmlPacket = require('./packets/aqw/XmlPacket');
const XtPacket = require('./packets/aqw/XtPacket');
const Packet = require('./packets');
const Protocol = require('./');

class AdventureQuestWorlds extends Protocol {
  constructor(client) {
    super(client);

    /**
     * Local handlers
     */
    this.regsiterLocalHandler(ADVENTUREQUEST_WORLDS_PACKETS.LOGIN, require('./handlers/aqw/local/Login'));

    /**
     * Remote handlers
     */
    this.regsiterRemoteHandler(ADVENTUREQUEST_WORLDS_PACKETS.LOGIN_RESPONSE,
      require('./handlers/aqw/remote/LoginResponse'));
    this.regsiterRemoteHandler(ADVENTUREQUEST_WORLDS_PACKETS.MOVE_TO_AREA, require('./handlers/aqw/remote/MoveToArea'));
    this.regsiterRemoteHandler(ADVENTUREQUEST_WORLDS_PACKETS.UOTLS, require('./handlers/aqw/remote/Uotls'));
    this.regsiterRemoteHandler(ADVENTUREQUEST_WORLDS_PACKETS.EXIT_AREA, require('./handlers/aqw/remote/ExitArea'));
  }

  /**
   * Constructs the local packet
   * @param {string} packet Packet to construct
   * @returns {Packet}
   * @public
   */
  constructPacket(packet) {
    const type = this._check(packet);

    switch (type) {
      case this.packetType.XML: return new XmlPacket(packet);
      case this.packetType.XT: return new XtPacket(packet);
      case this.packetType.JSON: return new JsonPacket(packet);
      default: return null;
    }
  }

  /**
   * Called on incoming/outgoing packet
   * @param {number} type Packet type
   * @param {string} packet Packet to handle
   * @public
   */
  onPacket(type, packet) {
    this.parseAndFire(type, packet);
  }

  /**
   * Sends the packet to the server
   * @param {Packet} packet Packet to send
   * @returns {Promise<void>}
   * @public
   */
  async remote(packet) {
    if (this.client.connectionState === CONNECTION_STATE.CONNECTED) {
      try {
        let toPacket = packet instanceof Packet ? packet.toPacket() : packet;
        if (typeof toPacket === 'object') toPacket = JSON.stringify(toPacket);

        if (this.client.server.debug) this.logger.info(`[Client] ${toPacket}`, { server: this.client.server.name });
        await this.client.remote.write(`${toPacket}\x00`);
      } catch (error) {
        this.logger.error(`Remote send failed! Reason: ${error.message}`, { server: this.client.server.name });
      }
    }
  }

  /**
   * Sends the packet to the server
   * @param {Packet} packet Packet to send
   * @returns {Promise<void>}
   * @public
   */
  async local(packet) {
    if (this.client.connectionState === CONNECTION_STATE.CONNECTED) {
      try {
        let toPacket = packet instanceof Packet ? packet.toPacket() : packet;
        if (typeof toPacket === 'object') toPacket = JSON.stringify(toPacket);

        if (this.client.server.debug) this.logger.info(`[Remote] ${toPacket}`, { server: this.client.server.name });
        await this.client.socket.write(`${toPacket}\x00`);
      } catch (error) {
        this.logger.error(`Local send failed! Reason: ${error.message}`, { server: this.client.server.name });
      }
    }
  }

  /**
   * Checks the packet type
   * @param {string} packet Packet to check
   * @returns {number}
   * @private
   */
  _check(packet) {
    const firstCharacter = packet[0];
    const lastCharacter = packet[packet.length - 1];

    if (firstCharacter === '<' && lastCharacter === '>') return this.packetType.XML;
    if (firstCharacter === '%' && lastCharacter === '%') return this.packetType.XT;
    if (firstCharacter === '{' && lastCharacter === '}') return this.packetType.JSON;
    return this.packetType.UNDEFINED;
  }

  /**
   * Sends a message to the server
   * @param {string} message Message to send
   * @returns {Promise<void>}
   */
  message(message) {
    return this.client.remoteWrite(`%xt%zm%message%1%${message}%zone%`);
  }

  /**
   * Sends a server warning message to the client
   * @param {string} message Message to send
   * @returns {Promise<void>}
   * @public
   */
  warning(message) {
    return this.client.localWrite(`%xt%warning%-1%${message}%`);
  }

  /**
   * Sends a server general message to the client
   * @param {string} message Message to send
   * @returns {Promise<void>}
   * @public
   */
  general(message) {
    return this.client.localWrite(`%xt%server%-1%${message}%`);
  }

  /**
   * Loads a shop by id
   * @param {number} id Shop id
   * @returns {Promise<void>}
   */
  shop(id) {
    return this.client.remoteWrite(`%xt%zm%loadShop%1%${id}%`);
  }
}

module.exports = AdventureQuestWorlds;
