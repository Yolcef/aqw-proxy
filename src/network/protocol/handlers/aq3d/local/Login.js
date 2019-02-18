const Handler = require('../../');

class Login extends Handler {
  handle(packet) {
    return this.client.constructPlayer(packet.object);
  }
}

module.exports = Login;

