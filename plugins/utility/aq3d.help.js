class Help extends Plugin {
  constructor(server) {
    super(server, {
      name: 'aq3d help',
      author: 'spirtiks',
      protocol: 'aq3d',
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
   * Sends the command server message
   * @param {Client} client Client instance
   * @param {*} message Message to send
   * @returns {Promise<void>}
   */
  commandMessage(client, message) {
    return client.localWrite({
      sender: 'SERVER',
      msg: `[D3D3D3]${message}[-]`,
      type: 4,
      cmd: 1,
    });
  }

  /**
   * Displays the list of commands
   * @param {Client} client Client instance
   * @returns {Promise<void>}
   * @public
   */
  commandList(client) {
    const { prefix } = Config.get('settings');
    let message = '';

    for (const [name, command] of this.server.plugins.commands) {
      message += `\n${prefix}[B]${name}[/B] - ${command.description}`;
    }
    return this.commandMessage(client, message);
  }
}

module.exports = Help;
