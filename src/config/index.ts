import database, { DatabaseConfig } from './database';
import environments, { Environment } from './environments';
import server, { ServerConfig } from './server';
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

const createConfig = (env: any) => ({
  appUrl: env.APP_URL,
  environment: env.NODE_ENV || 'dev-local',
  database: database(env),
  server: server(env)
});

export default (env: any): Config => joi.attempt(createConfig(env), schema);
