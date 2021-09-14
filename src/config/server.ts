import IProcessEnv from '../types/processEnv';
import joi from 'joi';

export interface ServerConfig {
  port: number
}

const schema = joi.object({
  port: joi.number().port().default(3001)
});

const createConfig = (env: IProcessEnv): ServerConfig => ({ port: Number(env.PORT) });

export default (env: IProcessEnv): ServerConfig => joi.attempt(createConfig(env), schema);
