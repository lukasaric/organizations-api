import App, { Router } from 'express';
import Controller from './controller';
import { IContainer } from 'bottlejs';
import Repository from './repository';

export default {
  createRouter,
  Repository,
  Controller
};

function createRouter({ userController }: IContainer): Router {
  return App.Router()
    .get('/', userController.fetch)
    .post('/', userController.create)
    .get('/:userId', userController.get);
}
