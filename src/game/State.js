class State {
  constructor() {
    /**
     * States store map
     * @type {Map<string, any>}
     * @private
     */
    this._states = new Map();
  }

  /**
   * Sets a value
   * @param {string} id Id of entry
   * @param {string} key Key to set
   * @param {any} value Value to add
   * @returns {this}
   */
  set(id, key, value) {
    const data = this._states.get(id) || {};
    data[key] = value;
    this._states.set(id, data);
    return this;
  }

  /**
   * Gets a key
   * @param {string} id Id of entry
   * @param {string} key Key to set
   * @param {any} [defaultValue] Default value if not found
   * @returns {any}
   */
  get(id, key, defaultValue) {
    if (this._states.has(id)) {
      const value = this._states.get(id)[key];
      return value === null ? defaultValue : value;
    }
    return defaultValue;
  }
}

module.exports = State;
