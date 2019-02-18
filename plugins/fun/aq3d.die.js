class Die extends Plugin {
  constructor(server) {
    super(server, {
      name: 'die',
      author: 'spirtik',
      protocol: 'aq3d',
      commands: [
        {
          name: 'die',
          description: 'Makes your character die',
          execute: ({ client }) => this.die(client),
        },
      ],
    });
  }

  /**
   * Sends the death packet
   * @param {Client} client Client instance
   * @returns {Promise<void>}
   * @public
   */
  die(client) {
    return client.remoteWrite({ type: 17, cmd: 14 });
  }
}

module.exports = Die;
