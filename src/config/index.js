const fse = require('fs-extra');
const Logger = require('../logger');
const path = require('path');

class Config {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  /**
   * Loads the in-memory config store
   * If no configuration file found it will create one
   * @private
   */
  static load() {
    if (!fse.existsSync(FULL_PATH)) {
      fse.outputJSONSync(FULL_PATH, TEMPLATE, { spaces: 2 });
      Logger.info(`Created a configuration file at: ${FULL_PATH}`);
      process.exit(0);
    }

    this._configuration = fse.readJsonSync(FULL_PATH, { encoding: 'utf-8' });
  }

  /**
   * Returns the value if the given key is found
   * @param {string} key The object key
   * @returns {Object}
   */
  static get(key) {
    return this._configuration[key];
  }
}

/**
 * Configuration path
 * @type {string}
 * @constant
 */
const FULL_PATH = path.join(__dirname, '..', '..', 'config', 'config.json');

/**
 * Configuration temaplet
 * @type {Object}
 * @constant
 */
const TEMPLATE = {
  web: {
    port: 80,
    enabled: true,
  },
  server: {
    name: 'Moon',
    protocol: 'aqw',
    port: 5588,
    debug: false,
    remote: {
      host: '',
      port: 5588,
    },
  },
  settings: {
    messageOfTheDay: 'Welcome to Moon!',
    prefix: '!',
  },
};

module.exports = Config;
