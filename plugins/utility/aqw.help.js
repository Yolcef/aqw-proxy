class Help extends Plugin {
  constructor(server) {
    super(server, {
      name: 'aqw help',
      author: 'spirtiks',
      commands: [
        {
          name: 'help',
          description: 'Displays the list of commands and their description',
          execute: ({ client }) => this.commandList(client),
        },
      ],
    });
  }
  /**
   * Displays the list of commands
   * @param {Client} client Client instance
   * @returns {Promise<void>}
   * @public
   */
  async commandList(client) {
    const { prefix } = Config.get('settings');
    const promises = [];

    await client.general('=== Command List ===');
    for (const [command, value] of this.server.plugins.commands) {
      promises.push(client.general(`${prefix}${command} - ${value.description}`));
    }
    return Promise.all(promises);
  }
}

module.exports = Help;
