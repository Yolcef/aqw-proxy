class Room {
  constructor(player) {
    /**
     * Player that instantiated this room
     * @type {Player}
     * @public
     */
    this.player = player;

    /**
     * Stores all of the players within the room
     * @type {Map<string, Object>}
     * @public
     */
    this.players = new Map();
  }

  /**
   * Adds a player to the room
   * @param {any} key Player key
   * @param {Object} data Player data
   * @public
   */
  addPlayer(key, data) {
    if (!this.players.has(key)) this.players.set(key, data);
  }

  /**
   * Removes a player from the room
   * @param {any} key Player key
   * @public
   */
  removePlayer(key) {
    if (this.players.has(key)) this.players.delete(key);
  }

  /**
   * Returns the player object if found
   * @param {any} key Player key to check for
   * @returns {any|Object}
   */
  getPlayerByKey(key) {
    return this.players.get(key) || {};
  }

  /**
   * Updates player data by key
   * @param {any} key Player key to check for
   * @param {any} value Data to add
   */
  updatePlayerDataByKey(key, value) {
    this.players.set(key, value);
  }

  /**
   * Find Player by username
   * @param {Client} client Client instance
   * @param {string} username Username of the player
   * @returns {any}
   * @public
   */
  findPlayerByUsername(client, username) {
    for (const player of client.player.room.players.values()) {
      const playerUsername = player.name === undefined ? player.uoName : player.name;
      if (playerUsername.toLowerCase() === username.toLowerCase()) return player;
    }
    return null;
  }

  /**
   * Clears all players from the room
   * @public
   */
  clear() {
    this.players.clear();
  }
}

module.exports = Room;
