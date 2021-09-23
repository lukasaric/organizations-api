import autobind from 'auto-bind';
import { DatabaseProvider } from '../shared/database';
import { IContainer } from 'bottlejs';
import IOrganizationRepository from './interfaces/repository';
import IOrganizationService from './interfaces/organization.service';
import map from 'lodash/map';
import Organization from './model';
import { QueryOrder } from '@mikro-orm/core';

const rootQuery = (id: number) => `
  SELECT id, parent_id
  FROM organization
  WHERE id = ${id}
`;

const getDescendantsQuery = (id: number) => `
WITH RECURSIVE org_tree AS (
  ${rootQuery(id)}
  UNION ALL
  SELECT org.id, org.parent_id
  FROM organization AS org
  JOIN org_tree ON org.parent_id = org_tree.id
) SELECT * FROM org_tree`;

const getAncestorsQuery = (id: number) => `
WITH RECURSIVE org_tree AS (
  SELECT id, parent_id
  FROM organization
  WHERE id IN (SELECT parent_id FROM (${rootQuery(id)}) as root)
  UNION ALL
  SELECT org.id, org.parent_id
  FROM organization AS org
  JOIN org_tree ON org.id = org_tree.parent_id
) SELECT * FROM org_tree`;

class OrganizationService implements IOrganizationService {
  #dbProvider: DatabaseProvider
  #organizationRepository: IOrganizationRepository

  constructor({ db, organizationRepository }: IContainer) {
    this.#dbProvider = db.provider;
    this.#organizationRepository = organizationRepository;
    autobind(this);
  }

  private getPopulatedOrgs(items: Organization[]): Promise<Organization[]> {
    const where = { id: map(items, 'id') };
    return this.#organizationRepository.find(where, {
      populate: ['memberships.user'],
      orderBy: { id: QueryOrder.ASC }
    });
  }

  async getDescendants({ id }: Organization): Promise<Organization[]> {
    const queryBuilder = this.#dbProvider.em.createQueryBuilder(Organization);
    const sql = getDescendantsQuery(id);
    const { rows: descendants } = await queryBuilder.raw(sql);
    return this.getPopulatedOrgs(descendants);
  }

  async getAncestors({ id }: Organization): Promise<Organization[]> {
    const queryBuilder = this.#dbProvider.em.createQueryBuilder(Organization);
    const sql = getAncestorsQuery(id);
    const { rows: ancestors } = await queryBuilder.raw(sql);
    return this.getPopulatedOrgs(ancestors);
  }
}

export default OrganizationService;
