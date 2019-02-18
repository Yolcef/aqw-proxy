class Speed extends Plugin {
  constructor(server) {
    super(server, {
      name: 'speed',
      author: 'spirtiks',
      protocol: 'aq3d',
      commands: [
        {
          name: 'speed',
          description: 'Sets your player movement speed',
          execute: ({ client, parameters }) => {
            const [speed] = parameters;
            return this.speed(client, speed);
          },
        },
      ],
    });
  }

  /**
   * Sets your player movement speed
   * @param {Client} client Client instance
   * @param {number} speed Speed of player movement
   * @returns {Promise<void>}
   * @public
   */
  speed(client, speed = 6.5) {
    return client.localWrite({ entityUpdate: {
      entityType: 1,
      entityID: client.player.id,
      statsCurrent: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Number(speed), 0, 0, 0, 0, 0, 0, 0, 0],
    }, type: 17, cmd: 3 });
  }
}

module.exports = Speed;
