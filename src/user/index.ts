import App, { Router } from 'express';
import Controller from './controller';
import { IContainer } from 'bottlejs';
import RepositoryFactory from './repository';

export default { createRouter, RepositoryFactory, Controller };

function createRouter({ userController }: IContainer): Router {
  return App.Router()
    .get('/', userController.getAll)
    .get('/:userId', userController.get);
}
