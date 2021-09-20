import * as middleware from './middleware';
import App, { Router } from 'express';
import Controller from './controller';
import { IContainer } from 'bottlejs';
import Repository from './repository';

export default {
  createRouter,
  Repository,
  Controller,
  middleware
};

function createRouter({
  organizationController,
  getOrganizationMiddleware
}: IContainer): Router {
  return App.Router()
    .get('/', organizationController.fetch)
    .post('/', organizationController.create)
    .param('organizationId', getOrganizationMiddleware)
    .get('/:organizationId', organizationController.get)
    .patch('/:organizationId', organizationController.update)
    .get('/:organizationId/descendants', organizationController.getDescendants)
    .get('/:organizationId/ancestors', organizationController.getAncestors);
}
