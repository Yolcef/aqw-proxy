class Shop extends Plugin {
  constructor(server) {
    super(server, {
      name: 'shop',
      author: 'spirtiks',
      protocol: 'any',
      commands: [
        {
          name: 'shop',
          description: 'Loads a shop by id',
          execute: ({ client, parameters }) => {
            const [shop] = parameters;
            return client.player.shop(shop);
          },
        },
      ],
    });
  }
}

module.exports = Shop;
