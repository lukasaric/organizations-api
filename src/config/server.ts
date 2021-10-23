import Env from '../types/env';
import joi from 'joi';

export interface ServerConfig {
  port: number
}

const schema = joi.object({
  port: joi.number().port().default(3001)
});

const createConfig = (env: Env): ServerConfig => ({ port: Number(env.SERVER_PORT) });

export default (env: Env): ServerConfig => joi.attempt(createConfig(env), schema);
