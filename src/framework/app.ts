import 'express-async-errors';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { IContainer } from 'bottlejs';
import IProgram from '../types/program';
import methodOverride from 'method-override';
import path from 'path';

const corsOptions = { optionsSuccessStatus: 200 };

function createApp(container: IContainer, registerRouters: IProgram['registerRouters']): Application {
  const { errorHandler } = container;
  const app = express();
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json({ limit: '250kb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(methodOverride());
  registerRouters(app, container);
  app.use(errorHandler);
  return app;
}

export default createApp;
