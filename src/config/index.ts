import database, { DatabaseConfig } from './database';
import environments, { Environment } from './environments';
import server, { ServerConfig } from './server';
import Env from '../types/env';
import joi from 'joi';

export interface Config {
  appUrl: string,
  environment: Environment,
  server: ServerConfig,
  database: DatabaseConfig
}

const schema = joi.object({
  appUrl: joi.string().uri(),
  environment: joi.string().valid(...environments),
  server: joi.object(),
  database: joi.object()
});

const createConfig = (env: Env) => ({
  appUrl: env.APP_URL,
  environment: env.NODE_ENV,
  database: database(env),
  server: server(env)
});

export default (env: Env): Config => joi.attempt(createConfig(env), schema);
