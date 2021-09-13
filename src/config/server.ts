import joi from 'joi';

export interface ServerConfig {
  port: number
}

const schema = joi.object({
  port: joi.number().port().default(3001)
});

const createConfig = (env: any): ServerConfig => ({ port: env.PORT });

export default (env: any): ServerConfig => joi.attempt(createConfig(env), schema);
