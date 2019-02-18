const Handler = require('../..');

class Move extends Handler {
  handle(packet) {
    const player = this.client.player.room.getPlayerByKey(packet.object.PlayerID);
    if (player) {
      player.posX = packet.object.posX;
      player.posY = packet.object.posY;
      player.posZ = packet.object.posZ;
      player.rotY = packet.object.rotY;

      this.client.player.room.updatePlayerDataByKey(
        packet.object.PlayerID,
        player
      );
    }
  }
}

module.exports = Move;
