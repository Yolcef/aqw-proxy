class Teleport extends Plugin {
  constructor(server) {
    super(server, {
      name: 'teleport',
      author: 'spirtiks',
      protocol: 'aq3d',
      commands: [
        {
          name: 'teleport',
          description: 'Teleports to x, y, z coordinates',
          execute: ({ client, parameters }) => {
            const [x, y, z] = parameters;
            return this.teleport(client, x, y, z);
          },
        },
      ],
    });
  }

  /**
   * Teleports to you coordinates
   * @param {Client} client Client instance
   * @param {number} x X coordinates
   * @param {number} y Y coordinates
   * @param {number} z Z coordinates
   * @returns {Promise<void>}
   * @public
   */
  async teleport(client, x = 0, y = 0, z = 0) {
    await client.localWrite({ entityId: client.player.id,
      entityType: 1, posX: x, posY: y, posZ: z, rotY: 311, type: 8, cmd: 4 });
    return client.remoteWrite({ posX: x, posY: y, posZ: z, rotY: 311, type: 1, cmd: 2 });
  }
}

module.exports = Teleport;
