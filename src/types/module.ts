import { IErrorMiddleware, IMiddleware } from '../types/middleware';
import { IContainer } from 'bottlejs';
import { RouterFactory } from './router';

export type ServiceConstructor<T> = { new(container: IContainer): T };
export type MiddlewareConstructor = ServiceConstructor<IMiddleware | IErrorMiddleware>;

interface IModule {
  createRouter?: RouterFactory;
  Controller?: { new(container: IContainer): any };
  Repository?: { new(container: IContainer): any };
  Service?: { new(container: IContainer): any };
  middleware?: { [name: string]: MiddlewareConstructor };
  modules?: { [name: string]: IModule };
}

export default IModule;
