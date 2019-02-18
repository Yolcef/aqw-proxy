const Server = require('./network/Server');
const logger = require('./logger');
const Config = require('./config');
const Plugin = require('./plugin');

/**
 * Config
 */
Config.load();

/**
 * Global config
 */
global.Config = Config;

/**
 * Global plugin
 */
global.Plugin = Plugin;

/**
 * Spawn
 */
Server.spawn()
  .then(() => logger.info('Successfully initialized!'))
  .catch(error => logger.error(`Failed to spawn servers.. Reason: ${error.message}`));
