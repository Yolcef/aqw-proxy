const Handler = require('../..');

class uotls extends Handler {
  handle(packet) {
    const { t } = packet.object;

    if (t === 'xt') this.client.player.room.addPlayer(packet.object.b.o.o.uoName, packet.object.b.o.o);
  }
}

module.exports = uotls;
