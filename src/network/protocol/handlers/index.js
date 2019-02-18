class Handler {
  constructor(manager) {
    /**
     * Manager that instantiated this handler
     * @type {Manager}
     * @protected
     */
    this.manager = manager;

    /**
     * Client instance
     * @type {Client}
     * @protected
     */
    this.client = manager.client;
  }

  handle() {
    throw new Error('Method not implemented.');
  }
}

module.exports = Handler;
