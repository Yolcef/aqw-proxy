const Process = require('../../process');
const cheerio = require('cheerio');
const builder = require('xmlbuilder');

/**
 * Handles the login response
 * @param {string} response Login response
 * @returns {string}
 */
const loginResponse = response => {
  const $ = cheerio.load(response, { xmlMode: true });
  const success = $('login').attr('bSuccess');

  $('login').attr('bCCOnly', 0);
  $('login').attr('iUpg', 1);

  if (!success) throw new Error(response);
  for (const [name, server] of Process.serverList) $('login').prepend(create(name, server));
  return $.xml();
};

/**
 * Creates the server object
 * @param {string} name Server name
 * @param {Object} server Server object
 * @returns {string}
 */ 
const create = (name, { port, count }) => builder.create({
  servers: {
    sName: name,
    sIP: '151.101.190.49',
    iCount: count,
    iMax: 1000,
    bOnline: 1,
    iChat: 2,
    bUpg: 0,
    sLang: 'en',
    iPort: port,
  },
}).end();

module.exports = loginResponse;
