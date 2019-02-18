const Handler = require('../../');

class ExitArea extends Handler {
  handle(packet) {
    const player = packet.object[5];
    this.client.player.room.removePlayer(player);
  }
}

module.exports = ExitArea;
