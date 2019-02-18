class Packet {
  constructor(packet) {
    this.object = packet;

    /**
     * Packet type
     * @type {string}
     * @public
     */
    this.type = null;

    /**
     * Packet send
     * @type {boolean}
     * @public
     */
    this.send = true;
  }

  /**
   * Parses the packet
   * @abstract
   */
  parse() {
    throw new Error('Method not implemented.');
  }

  /**
   * Converts the packet to string
   * @abstract
   */
  toPacket() {
    throw new Error('Method not implemented.');
  }
}

module.exports = Packet;
