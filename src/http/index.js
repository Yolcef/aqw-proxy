const requestPromise = require('request-promise-native');
const request = require('request');

class Http {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  /**
   * Reverse proxies AdventureQuest Worlds
   * @param {string} url Address path
   * @returns {Promise<request>}
   * @static
   */
  static proxy(url) {
    return request(url);
  }

  /**
   * Makes a HTTP get request
   * @param {Object} options Request options
   * @returns {Promise<request>}
   */
  static get(options) {
    return requestPromise.get(options);
  }

  /**
   * Makes a HTTP post request
   * @param {Object} options Request options
   * @returns {Promise<request>}
   */
  static post(options) {
    return requestPromise.post(options);
  }
}

module.exports = Http;
