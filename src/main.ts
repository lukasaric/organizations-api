import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { Application, NextFunction, Request, Response } from 'express';
import createConfig from './config';
import Db from './shared/database';
import ErrorHandler from './shared/error-handler';
import { IContainer } from 'bottlejs';
import IProgram from './types/program';
import logger from './shared/logger';
import organization from './organization';
import OrganizationService from './organization/organization.service';
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

function configure(provider: Provider): void {
  provider.factory('config', () => createConfig(process.env));
  provider.value('logger', logger);
  provider.registerMiddleware('errorHandler', ErrorHandler);
  provider.registerService('db', Db);
  provider.registerModule('user', user);
  provider.registerModule('organization', organization);
  provider.registerService('organizationService', OrganizationService);
}

async function beforeStart({ db }: IContainer): Promise<void> {
  await db.connect();
}

function registerRouters(app: Application, container: IContainer): void {
  const { db, userRouter, organizationRouter } = container;
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    RequestContext.create(db.provider.em, next);
  });
  app.use('/api/users', userRouter);
  app.use('/api/organizations', organizationRouter);
}
