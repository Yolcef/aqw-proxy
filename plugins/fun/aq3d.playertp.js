class Teleport extends Plugin {
  constructor(server) {
    super(server, {
      name: 'playertp',
      author: 'spirtiks',
      protocol: 'aq3d',
      commands: [
        {
          name: 'playertp',
          description: 'Teleports to player position',
          execute: ({ client, parameters }) => {
            const username = parameters.join(' ');
            return this.teleport(client, username);
          },
        },
      ],
    });
  }

  /**
   * Teleports to you coordinates
   * @param {Client} client Client instance
   * @param {string} username Username of the player
   * @returns {Promise<void>}
   * @public
   */
  async teleport(client, username) {
    const player = client.player.room.findPlayerByUsername(client, username);
    if (player) {
      const { posX, posY, posZ, rotY } = player;

      await client.localWrite({ entityId: client.player.id,
        entityType: 1, posX, posY, posZ, rotY, type: 8, cmd: 4 });
      return client.remoteWrite({ posX, posY, posZ, rotY, type: 1, cmd: 2 });
    }
    return null;
  }
}

module.exports = Teleport;
