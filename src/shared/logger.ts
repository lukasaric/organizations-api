import Logger, { LogLevel, Stream } from 'bunyan';
import bformat from 'bunyan-format';

const formatOut = bformat({ outputMode: 'short' });

function createLogger(): Logger {
  const streams: Stream[] = [{ level: 'debug', stream: formatOut }];
  const logger = Logger.createLogger({
    name: `${process.env.npm_package_name}`,
    streams,
    level: process.env.LOG_LEVEL as LogLevel
  });

  return logger.child({
    ver: process.env.npm_package_version,
    env: process.env.NODE_ENV
  });
}

export default createLogger();
