const Packet = require('../');

class JsonPacket extends Packet {
  parse() {
    this.object = JSON.parse(this.object);
    this.type = this.object.type || 255;
    this.cmd = this.object.cmd || 255;
  }

  toPacket() {
    return JSON.stringify(this.object);
  }
}

module.exports = JsonPacket;
