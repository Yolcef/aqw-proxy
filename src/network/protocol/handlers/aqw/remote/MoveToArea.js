const Handler = require('../../');

class MoveToArea extends Handler {
  handle(packet) {
    this.client.player.room.clear();

    for (const entity of packet.object.b.o.uoBranch) {
      if (entity.uoName.toLowerCase() === this.client.player.username.toLowerCase()) {
        this.client.player.id = entity.entID;
      }

      this.client.player.room.addPlayer(entity.uoName, entity);
    }
  }
}

module.exports = MoveToArea;
