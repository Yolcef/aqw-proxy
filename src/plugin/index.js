class Plugin {
  constructor(server, info) {
    /**
     * Validates the plugin information
     * @static
     */
    this.constructor.validateInfo(server, info);

    /**
     * The plugin name
     * @type {string}
     * @public
     */
    this.name = info.name;

    /**
     * The plugin author
     * @type {string}
     * @public
     */
    this.author = info.author;

    /**
     * Plugin protocol type
     * @type {string}
     * @public
     */
    this.protocol = info.protocol || 'aqw';

    /**
     * The plugin description
     * @type {string}
     * @public
     */
    this.description = info.description || 'No description set';

    /**
     * Sets if the plugin is enabled/disabled
     * @type {boolean}
     * @public
     */
    this.enabled = info.enabled || true;

    /**
     * Command handlers
     * @type {Array}
     * @public
     */
    this.commands = info.commands || [];

    /**
     * Hook handlers
     * @type {Array}
     * @public
     */
    this.hooks = info.hooks || [];

    /**
     * Player states
     * @type {Array}
     * @public
     */
    this.states = info.states || [];

    /**
     * The server that instantiated this plugin
     * @type {Server}
     * @public
     */
    this.server = server;
  }

  /**
   * Validates the plugin options
   * @param {TCPServer} server Server
   * @param {Object} info Plugin information
   */
  static validateInfo(server, info) {
    if (!server) throw new Error('A server must be specified.');
    if (typeof info !== 'object') throw new TypeError('Plugin info must be an Object.');
    if (typeof info.name !== 'string') throw new TypeError('Plugin name must be a string.');
    if (info.name !== info.name.toLowerCase()) throw new TypeError('Plugin name must be lowercase.');
    if (typeof info.author !== 'string') throw new TypeError('Plugin author must be a string.');
  }

  /**
   * Called when the plugin has initialized
   * @returns {any}
   * @public
   */
  initialize() {
    return null;
  }

  /**
   * Returns the instance of the logger
   * @returns {logger}
   * @protected
   */
  get logger() {
    return this.server.logger;
  }
}

module.exports = Plugin;
