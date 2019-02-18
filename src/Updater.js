const { version } = require('../package.json');
const { notify } = require('./util');
const semver = require('semver');
const Http = require('./http');
const path = require('path');
const opn = require('opn');

class Updater {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  /**
   * Host endpoint
   * @type {string}
   * @readonly
   * @static
   */
  static get baseUrl() {
    return 'https://api.github.com';
  }

  /**
   * Checks for an update
   * @static
   */
  static async checkForNewRelease() {
    try {
      const response = await Http.get({ url: `${this.baseUrl}/repos/spirtiks/moon/releases/latest`,
        headers: { 'User-Agent': 'Awesome-Octocat-App' }, json: true });

      const latestVersion = response.tag_name;
      const page = response.html_url;

      if (semver.lt(version, latestVersion)) this._notifyAndOpen(page);
    } catch (error) {
      // Unable to fetch information
    }
  }

  /**
   * Sends a desktop notifcation and opens the release page
   * @param {strng} page Page to open
   * @returns {NodeNotifier}
   * @private
   */
  static _notifyAndOpen(page) {
    return notify({
      title: 'New Update available!',
      message: 'Fancy updates, click me!',
      icon: path.join(__dirname, '..', 'assets', 'icon.png'),
      wait: true,
    }).on('click', () => opn(page));
  }
}

module.exports = Updater;

