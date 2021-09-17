import { NextFunction, Request, Response } from 'express';
import autobind from 'auto-bind';
import { IContainer } from 'bottlejs';
import { IMiddleware } from '../../types/middleware';
import IOrganizationRepository from '../interfaces/repository';
import { NotFound } from 'http-errors';

class GetOrganizationMiddleware implements IMiddleware {
  #organizationRepository: IOrganizationRepository;

  constructor({ organizationRepository }: IContainer) {
    this.#organizationRepository = organizationRepository;
    autobind(this);
  }

  async handle(req: Request, _: Response, next: NextFunction, id: string): Promise<void> {
    const organization = await this.#organizationRepository.findOne(Number(id));
    if (!organization) throw new NotFound('Organization not found');
    req.organization = organization;
    next();
  }
}

export default GetOrganizationMiddleware;
