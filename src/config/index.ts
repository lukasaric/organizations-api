import database, { DatabaseConfig } from './database';
import environments, { Environment } from './environments';
import server, { ServerConfig } from './server';
import IProcessEnv from '../types/processEnv';
import joi from 'joi';

export interface Config {
  appUrl: string,
  environment: Environment,
  server: ServerConfig,
  database: DatabaseConfig
}

const schema = joi.object({
  appUrl: joi.string().uri(),
  environment: joi.string().valid(...environments).required(),
  server: joi.object(),
  database: joi.object()
});

const createConfig = (env: IProcessEnv) => ({
  appUrl: env.APP_URL,
  environment: env.NODE_ENV,
  database: database(env),
  server: server(env)
});

export default (env: IProcessEnv): Config => joi.attempt(createConfig(env), schema);
