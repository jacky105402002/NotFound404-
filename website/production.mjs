import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createPreviewServer} from './server.mjs';

export function productionConfig(env = process.env) {
  const port = Number(env.PORT ?? 8080);
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('PORT must be an integer from 0 to 65535');
  return {port, host: env.HOST || '0.0.0.0'};
}

export function startProductionServer(env = process.env) {
  const config = productionConfig(env);
  const server = createPreviewServer();
  server.listen(config.port, config.host, () => {
    console.log('Listening on ' + config.host + ':' + server.address().port);
  });
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = startProductionServer();
  server.on('error', error => {console.error(error.message);process.exitCode = 1;});
  const shutdown = () => {
    server.close(() => process.exit(0));
    server.closeIdleConnections();
    setTimeout(() => process.exit(1), 10000).unref();
  };
  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);
}

