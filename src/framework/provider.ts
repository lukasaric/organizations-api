import IModule, {
  MiddlewareConstructor,
  ServiceConstructor
} from '../types/module';
import Bottle from 'bottlejs';
import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';

class Provider extends Bottle {
  registerModule(name: string, module: IModule): void {
    const {
      createRouter,
      Controller,
      Repository,
      Service,
      middleware,
      modules
    } = module;
    if (middleware) {
      forEach(middleware, (Middleware, name) => {
        this.registerMiddleware(camelCase(name), Middleware);
      });
    }
    if (Repository) this.registerRepository(`${name}Repository`, Repository);
    if (modules) forEach(modules, (module, name) => this.registerModule(name, module));
    if (Service) this.registerService(`${name}Service`, Service);
    this.registerService(`${name}Controller`, Controller);
    this.factory(`${name}Router`, createRouter);
  }

  registerMiddleware(name: string, Middleware: MiddlewareConstructor): void {
    this.factory(name, container => {
      const middleware = new Middleware(container);
      return middleware.handle;
    });
  }

  registerService(name: string, Service: ServiceConstructor<any>): void {
    this.factory(name, container => new Service(container));
  }

  registerRepository(name: string, Repository: IModule['Repository']): void {
    this.factory(name, container => new Repository(container));
  }
}

const provider = new Provider();

export default provider;
export { Provider };
