const Handler = require('../..');

class Channel extends Handler {
  handle(packet) {
    this.client.player.channel = packet.object.channelID;
  }
}

module.exports = Channel;
