const LoginResponse = require('../../../http/responses/Login');
const Http = require('../../../http');

class GameController {
  /**
   * Host endpoint
   * @type {string}
   * @readonly
   * @static
   */
  get baseUrl() {
    return 'https://game.aq.com';
  }

  /**
   * Renders AdventureQuest Worlds
   * @param {Object} request Http request
   * @param {Object} response Http response
   * @returns {Promise<void>}
   * @public
   */
  index(request, response) {
    return request.pipe(Http.proxy({ url: `${this.baseUrl}/${request.path}` })).pipe(response);
  }

  /**
   * Renders play page
   * @param {Object} request Http request
   * @param {Object} response Http response
   * @returns {void}
   * @public
   */
  play(request, response) {
    return response.render('play');
  }

  /**
   * Attempts to authenticate an account
   * @param {Object} request Http request
   * @param {Object} response Http response
   * @public
   */
  async authenticate(request, response) {
    const form = {
      unm: request.body.unm,
      pwd: request.body.pwd,
    };

    try {
      const login = await Http.post({ url: `${this.baseUrl}/game/cf-userlogin.asp`, form });

      const loginResponse = LoginResponse(login);
      return response.status(200).send(loginResponse);
    } catch (error) {
      return response.status(200).send(error.message);
    }
  }
}

module.exports = new GameController();

