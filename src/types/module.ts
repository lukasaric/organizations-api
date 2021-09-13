import { IErrorMiddleware, IMiddleware } from '../types/middleware';
import { EntityRepository } from '@mikro-orm/postgresql';
import { IContainer } from 'bottlejs';
import { RouterFactory } from './router';

export type InstanceFactory<T> = { instance(): T };
export type ServiceConstructor<T> = { new(container: IContainer): T }
export type RepositoryFactory<T> = (container: IContainer) => T;
export type MiddlewareConstructor = ServiceConstructor<IMiddleware | IErrorMiddleware>;

interface IModule {
  createRouter?: RouterFactory;
  Controller?: { new(container: IContainer): any };
  RepositoryFactory?: RepositoryFactory<EntityRepository<any>>;
  Service?: { new (container: IContainer): any };
  middleware?: { [name: string]: MiddlewareConstructor };
  modules?: { [name: string]: IModule };
}

export default IModule;
