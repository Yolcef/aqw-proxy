const Handler = require('../..');

class Area extends Handler {
  handle(packet) {
    if (packet.cmd === 1) this.client.player.room.clear();
    else if (packet.cmd === 2) this.client.player.room.removePlayer(packet.object.entityID);
  }
}

module.exports = Area;

