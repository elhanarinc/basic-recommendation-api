import { createLogger, format, transports } from 'winston';

const { combine, splat, timestamp, printf } = format;

const myFormat = printf(
  ({ level, message, timestamp: currTimeStamp }) =>
    `${currTimeStamp} [${level}]: ${message}`
);

const logger = createLogger({
  level: 'debug',
  format: combine(format.colorize(), splat(), timestamp(), myFormat),
  transports: [new transports.Console({ level: 'info' })],
});

export default logger;
