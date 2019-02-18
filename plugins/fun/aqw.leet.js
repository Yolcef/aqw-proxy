const leet = require('leet');

class Leet extends Plugin {
  constructor(server) {
    super(server, {
      name: 'leet',
      author: 'spirtik',
      commands: [
        {
          name: 'leet',
          description: 'Talk in leet text',
          execute: () => this.toggle(),
        },
      ],
      hooks: [
        {
          packet: 'message',
          type: 'local',
          execute: ({ client, packet }) => this.message(client, packet),
        },
      ],
    });

    /**
     * Leet toggle
     * @type {boolean}
     * @private
     */
    this._leet = false;
  }

  /**
   * Leet toggle
   * @public
   */
  toggle() {
    this._leet = !this._leet;
  }

  /**
   * Handles message packet
   * @param {Client} client Client instance
   * @param {Packet} packet Packet object
   * @returns {Promise<void>}
   * @public
   */
  message(client, packet) {
    if (this._leet) {
      packet.send = false;

      const message = packet.object[5];
      return client.player.message(this.leet(message));
    }
    return null;
  }

  /**
   * Converts text to leet
   * @param {string} text Text to string
   * @returns {string}
   * @public
   */
  leet(text) {
    return leet.convert(text)
      .replace(/zorz|xor/gi, '');
  }
}

module.exports = Leet;
