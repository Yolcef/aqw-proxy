const { createLogger, format, transports } = require('winston');
const { combine, colorize, simple, timestamp, printf } = format;

const logger = createLogger({
  format: combine(
    colorize(),
    simple(),
    timestamp({ format: 'HH:mm:ss' }),
    printf(info => `${info.timestamp} ${info.level}:${info.server ? ` [${info.server}]` : ''} ${info.message}`),
  ),
  transports: [new transports.Console({
    handleExceptions: true,
  })],
  exitOnError: false,
});

module.exports = logger;
