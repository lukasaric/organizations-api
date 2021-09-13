import { Application } from 'express';
import { IContainer } from 'bottlejs';
import { Provider } from '../framework/provider';

interface IProgram {
  configure(provider: Provider): void;
  beforeStart(container: IContainer): Promise<void>;
  registerRouters: (app: Application, container: IContainer) => void;
}

export default IProgram;
