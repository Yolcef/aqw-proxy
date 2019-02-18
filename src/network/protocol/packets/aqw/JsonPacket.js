const Packet = require('../');

class JsonPacket extends Packet {
  parse() {
    this.object = JSON.parse(this.object);
    this.type = this.object.b.o.cmd;
  }

  toPacket() {
    return JSON.stringify(this.object);
  }
}

module.exports = JsonPacket;
