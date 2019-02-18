const Handler = require('../../');

class LoginResponse extends Handler {
  handle(packet) {
    packet.send = false;

    const { messageOfTheDay } = Config.get('settings');
    packet.object[7] = messageOfTheDay;
    return this.client.localWrite(packet);
  }
}

module.exports = LoginResponse;
