import autobind from 'auto-bind';
import { DatabaseProvider } from '../shared/database';
import { IContainer } from 'bottlejs';
import IOrganizationService from './interfaces/organization.service';
import Organization from './model';

const rootQuery = (id: number) => `
  SELECT id, parent_id, name
  FROM organization
  WHERE id = ${id}
`;

const getDescendantsQuery = (id: number) => `
WITH RECURSIVE org_tree AS (
  ${rootQuery(id)}
  UNION ALL
  SELECT org.id, org.parent_id, org.name
  FROM organization AS org
  JOIN org_tree ON org.parent_id = org_tree.id
) SELECT * FROM org_tree`;

const getAncestorsQuery = (id: number) => `
WITH RECURSIVE org_tree AS (
  SELECT id, parent_id, name
  FROM organization
  WHERE id IN (SELECT parent_id FROM (${rootQuery(id)}) as root)
  UNION ALL
  SELECT org.id, org.parent_id, org.name
  FROM organization AS org
  JOIN org_tree ON org.id = org_tree.parent_id
) SELECT * FROM org_tree`;

class OrganizationService implements IOrganizationService {
  #dbProvider: DatabaseProvider

  constructor({ db }: IContainer) {
    this.#dbProvider = db.provider;
    autobind(this);
  }

  async getDescendants({ id }: Organization): Promise<Organization[]> {
    const qb = this.#dbProvider.em.createQueryBuilder(Organization);
    const sql = getDescendantsQuery(id);
    const { rows: descendants } = await qb.raw(sql);
    return descendants;
  }

  async getAncestors({ id }: Organization): Promise<Organization[]> {
    const qb = this.#dbProvider.em.createQueryBuilder(Organization);
    const sql = getAncestorsQuery(id);
    const { rows: ancestors } = await qb.raw(sql);
    return ancestors;
  }
}

export default OrganizationService;
