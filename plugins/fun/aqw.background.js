class Background extends Plugin {
  constructor(server) {
    super(server, {
      name: 'background',
      author: 'spirtik',
      commands: [
        {
          name: 'background',
          description: 'Changes your character page background',
          execute: ({ client, parameters }) => {
            const [background] = parameters;
            return this.characterPageBackground(client, background);
          },
        },
      ],
    });
  }
  /**
   * Sets character page background
   * @param {Client} client Client instance
   * @param {number} background Character background id
   * @returns {Promise<void>}
   */
  characterPageBackground(client, background) {
    return client.remoteWrite(`%xt%zm%updateQuest%30%55%${parseInt(background)}%`);
  }
}

module.exports = Background;
