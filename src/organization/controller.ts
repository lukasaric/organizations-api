import { Request, Response } from 'express';
import autobind from 'auto-bind';
import { IContainer } from 'bottlejs';
import IOrganizationRepository from './interfaces/repository';
import IOrganizationService from './interfaces/organization.service';
import joi from 'joi';
import Organization from './model';
import { organizationSchema } from './validation';

class OrganizationController {
  #repository: IOrganizationRepository;
  #organizationService: IOrganizationService

  constructor({ organizationRepository, organizationService }: IContainer) {
    this.#repository = organizationRepository;
    this.#organizationService = organizationService;
    autobind(this);
  }

  async fetch(_: Request, res: Response): Promise<Response> {
    const data = await this.#repository.findAll({ populate: ['children'] });
    return res.json({ data });
  }

  async get({ organization }: Request, res: Response): Promise<Response> {
    await this.#repository.populate(organization, ['memberships.user', 'children']);
    return res.json({ data: organization });
  }

  async create({ body }: Request, res: Response): Promise<Response> {
    const { name, parentId } = joi.attempt(body, organizationSchema.tailor('create'));
    const data = new Organization(name, parentId);
    await this.#repository.persistAndFlush(data);
    return res.json({ data });
  }

  async update({ organization, body }: Request, res: Response): Promise<Response> {
    const organizationData = joi.attempt(body, organizationSchema.tailor('update'));
    this.#repository.assign(organization, organizationData);
    await this.#repository.persistAndFlush(organization);
    return res.json({ data: organization });
  }

  async getDescendants({ organization }: Request, res: Response): Promise<Response> {
    const descendants = await this.#organizationService.getDescendants(organization);
    return res.json({ data: descendants });
  }

  async getAncestors({ organization }: Request, res: Response): Promise<Response> {
    const ancestors = await this.#organizationService.getAncestors(organization);
    return res.json({ data: ancestors });
  }
}

export default OrganizationController;
