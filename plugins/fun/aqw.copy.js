class Copy extends Plugin {
  constructor(server) {
    super(server, {
      name: 'copy',
      author: 'spirtik',
      commands: [
        {
          name: 'copy',
          description: 'copies player messages',
          execute: ({ client, parameters }) => {
            const username = parameters.join(' ')
              .toLowerCase();
            return this.copy(client, username);
          },
        },
      ],
      hooks: [
        {
          packet: 'chatm',
          type: 'remote',
          execute: ({ client, packet }) => this.message(client, packet),
        },
      ],
    });

    /**
     * Target player to copy
     * @type {?string}
     * @private
     */
    this._target = null;

    /**
     * Copt toggle
     * @type {boolean}
     * @private
     */
    this._copy = false;
  }

  /**
   * Follow a player
   * @param {Client} client Client instance
   * @param {string} username Username of the player to follow
   * @public
   */
  copy(client, username) {
    if (!username) return;

    const player = client.player.room.getPlayerByKey(username);
    if (player) this._target = player.uoName;

    this._copy = !this._copy;
  }

  /**
   * Handles message packet
   * @param {Client} client Client instance
   * @param {Packet} packet Packet object
   * @returns {Promise<void>}
   * @public
   */
  message(client, packet) {
    const [type, message] = packet.object[4].split('~');
    const target = packet.object[5].toLowerCase();

    if (this._copy && this._target === target && type === 'zone') {
      return client.player.message(message);
    }
    return null;
  }
}

module.exports = Copy;
