const Handler = require('../..');

class Cell extends Handler {
  handle(packet) {
    if (packet.cmd === 1) {
      for (const entity of packet.object.entities) {
        if (!this.client.player.username && entity.ID === this.client.player.id) {
          this.client.player.username = entity.name.toLowerCase();
        }

        if (entity.baseAsset.gender === 'M' || entity.baseAsset.gender === 'F') {
          this.client.player.room.addPlayer(entity.ID, entity);
        }
      }
    } else if (packet.cmd === 2) {
      this.client.player.room.addPlayer(packet.object.entity.ID, packet.object.entity);
    }
  }
}

module.exports = Cell;

