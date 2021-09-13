import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { Application, NextFunction, Request, Response } from 'express';
import createConfig from './config';
import Db from './shared/database';
import ErrorHandler from './shared/error-handler';
import { IContainer } from 'bottlejs';
import IProgram from './types/program';
import logger from './shared/logger';
import { Provider } from './framework/provider';
import { RequestContext } from '@mikro-orm/core';
import user from './user';

dotenv.config();

const program: IProgram = {
  configure,
  beforeStart,
  registerRouters
};
export default program;

async function beforeStart({ app, db }: IContainer): Promise<void> {
  await db.connect();
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    RequestContext.create(db.provider.em, next);
  });
}

function configure(provider: Provider): void {
  provider.value('logger', logger);
  provider.factory('config', () => createConfig(process.env));
  provider.registerMiddleware('errorHandler', ErrorHandler);
  provider.registerService('db', Db);
  provider.registerModule('user', user);
}

function registerRouters(app: Application, container: IContainer): void {
  const { userRouter } = container;
  app.use('/api/users', userRouter);
}
