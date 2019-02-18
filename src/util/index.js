const chalk = require('chalk');
const notifier = require('node-notifier');
const { version } = require('../../package.json');

class Util {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  /**
   * Prints moon ascii art to the console
   * @static
   */
  static dumpAsciiLogo() {
    // eslint-disable-next-line no-console
    console.log(chalk.whiteBright([
    "AQWorlds Proxy",
    ].join('\n')), `\n\t ${chalk.whiteBright(`Version v${version}`)}\n`);
  }

  /**
   * Check if a function is a promise
   * @param {Function} value Function to check
   * @returns {boolean}
   */
  static isPromise(value) {
    return value &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function';
  }

  /**
   * Desktop notifcation
   * @param {Object} options Notify options
   * @returns {NodeNotifier}
   */
  static notify(options = {}) {
    return notifier.notify(options);
  }
}

module.exports = Util;

