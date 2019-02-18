const cheerio = require('cheerio');
const Packet = require('../');

class XmlPacket extends Packet {
  parse() {
    this.object = cheerio.load(this.object, {
      xmlMode: true,
    });

    this.type = this.object('body').attr('action');
  }

  toPacket() {
    return this.object.xml();
  }
}

module.exports = XmlPacket;
