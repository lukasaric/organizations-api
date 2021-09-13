import { createTerminus } from '@godaddy/terminus';
import http from 'http';
import { IContainer } from 'bottlejs';

function createServer({ config, app, logger }: IContainer): http.Server {
  const { port } = config.server;
  app.set('port', port);
  const server = http.createServer(app);
  createTerminus(server, {
    signals: ['SIGINT', 'SIGTERM'],
    healthChecks: {
      '/healthcheck': onHealthCheck,
      verbatim: true
    },
    onSignal
  });
  server.on('error', onError);
  server.on('listening', onListening);
  return server;

  async function onSignal() {
    logger.debug('server shutdown');
  }

  async function onHealthCheck() {
    logger.debug('healthcheck requested');
  }

  /* eslint-disable-next-line no-undef */
  function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
      ? `Pipe ${port}`
      : `Port ${port}`;

    switch (error.code) {
      case 'EACCES':
        logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
      case 'EADDRINUSE':
        logger.error(`${bind} is already in use`);
        process.exit(1);
      default:
        throw error;
    }
  }

  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;
    logger.info(`Server listening on ${bind}`);
  }
}

export default createServer;
