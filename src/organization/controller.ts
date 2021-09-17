import { Request, Response } from 'express';
import autobind from 'auto-bind';
import { IContainer } from 'bottlejs';
import IOrganizationRepository from './interfaces/repository';
import joi from 'joi';
import Organization from './model';
import { organizationSchema } from './validation';

class OrganizationController {
  #repository: IOrganizationRepository;

  constructor({ organizationRepository }: IContainer) {
    this.#repository = organizationRepository;
    autobind(this);
  }

  async fetch(_: Request, res: Response): Promise<Response> {
    const data = await this.#repository.findAll();
    return res.json({ data });
  }

  async get({ organization }: Request, res: Response): Promise<Response> {
    await this.#repository.populate(organization, ['memberships']);
    return res.json({ data: organization });
  }

  async create({ body }: Request, res: Response): Promise<Response> {
    const { name } = joi.attempt(body, organizationSchema.tailor('create'));
    const data = new Organization(name);
    await this.#repository.persistAndFlush(data);
    return res.json({ data });
  }

  async update({ organization, body }: Request, res: Response): Promise<Response> {
    const organizationData = joi.attempt(body, organizationSchema.tailor('update'));
    this.#repository.assign(organization, organizationData);
    await this.#repository.persistAndFlush(organization);
    return res.json({ data: organization });
  }
}

export default OrganizationController;
