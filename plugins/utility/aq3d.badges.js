class Badges extends Plugin {
  constructor(server) {
    super(server, {
      name: 'badges',
      author: 'spirtiks',
      protocol: 'aq3d',
      commands: [
        {
          name: 'badges',
          description: 'Attempts to load badges',
          execute: ({ client }) => this.loadBadges(client),
        },
      ],
    });

    /**
     * Badge load interval
     * @type {Timeout}
     * @public
     */
    this._interval = null;

    /**
     * Badge id
     * @type {number}
     */
    this._id = 0;
  }

  /**
   * Sends the badge packet to the server
   * @param {Client} client Client instance
   * @param {number} id Badge id
   * @returns {Promise<void>}
   */
  badge(client, id) {
    return client.remoteWrite({
      name: 'ic1',
      index: id,
      value: true,
      type: 17,
      cmd: 9,
    });
  }

  /**
   * Loads badges
   * @param {Client} client Client instance
   * @public
   */
  loadBadges(client) {
    if (this._interval) {
      this.clear(client, this._interval);
      return;
    }

    this._interval = client.setInterval(() => this.badge(client, this._id++), 600);
  }

  /**
   * Clears an interval
   * @param {Client} client Client instance
   * @param {Timeout} interval Interval to clear
   */
  clear(client, interval) {
    client.clearInterval(interval);
    this._interval = null;
    this._id = 0;
  }
}

module.exports = Badges;
