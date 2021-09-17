import {
  EntityData,
  FilterQuery,
  FindOneOptions,
  FindOptions,
  Populate
} from '@mikro-orm/core';
import { DatabaseProvider } from '../shared/database';
import { IContainer } from 'bottlejs';
import IOrganizationRepository from './interfaces/repository';
import Organization from './model';

class OrganizationRepository implements IOrganizationRepository {
  #dbProvider: DatabaseProvider;

  constructor({ db }: IContainer) {
    this.#dbProvider = db.provider;
  }

  findOne(
    where: FilterQuery<Organization>,
    options?: FindOneOptions<Organization>
  ): Promise<Organization | null> {
    const repository = this.#dbProvider.em.getRepository(Organization);
    return repository.findOne(where, options);
  }

  find(
    where: FilterQuery<Organization>,
    options?: FindOptions<Organization>
  ): Promise<Organization[]> {
    const repository = this.#dbProvider.em.getRepository(Organization);
    return repository.find(where, options);
  }

  findAll(options?: FindOptions<Organization>): Promise<Organization[]> {
    const repository = this.#dbProvider.em.getRepository(Organization);
    return repository.findAll(options);
  }

  persistAndFlush(organization: Organization | Organization[]): Promise<void> {
    const repository = this.#dbProvider.em.getRepository(Organization);
    return repository.persistAndFlush(organization);
  }

  flush(): Promise<void> {
    const repository = this.#dbProvider.em.getRepository(Organization);
    return repository.flush();
  }

  assign(
    organization: Organization,
    data: EntityData<Organization>
  ): Organization {
    const repository = this.#dbProvider.em.getRepository(Organization);
    return repository.assign(organization, data);
  }

  populate(
    organization: Organization,
    populate: string | keyof Organization | Populate<Organization>
  ): Promise<Organization> {
    const repository = this.#dbProvider.em.getRepository(Organization);
    return repository.populate(organization, populate);
  }
}

export default OrganizationRepository;
