class Gold extends Plugin {
  constructor(server) {
    super(server, {
      name: 'gold',
      author: 'spirtiks',
      protocol: 'aq3d',
      commands: [
        {
          name: 'gold',
          description: 'Sets your gold amount (client-side)',
          execute: ({ client, parameters }) => {
            const [gold] = parameters;
            return this.gold(client, gold);
          },
        },
      ],
    });
  }

  /**
   * Sets your gold amount client side
   * @param {Client} client Client instance
   * @param {number} gold Gold amount
   * @returns {Promise<void>}
   * @public
   */
  gold(client, gold = 1337) {
    return client.localWrite({
      fGold: parseInt(gold),
      type: 17,
      cmd: 1,
    });
  }
}

module.exports = Gold;
