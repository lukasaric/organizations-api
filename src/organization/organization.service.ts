import autobind from 'auto-bind';
import { IContainer } from 'bottlejs';
import IOrganizationRepository from './interfaces/repository';
import IOrganizationService from './interfaces/organization.service';
import Organization from './model';
import P from 'bluebird';

class OrganizationService implements IOrganizationService {
  #organizationRepository: IOrganizationRepository;

  constructor({ organizationRepository }: IContainer) {
    this.#organizationRepository = organizationRepository;
    autobind(this);
  }

  async getChildren(parentId: number): Promise<Organization[]> {
    const options = { populate: ['memberships.user'] };
    return this.#organizationRepository.find({ parentId }, options);
  }

  async getDescendants(organization: Organization): Promise<Organization[]> {
    const children = await this.getChildren(organization.id);
    if (!children.length) return [];
    const descendants = await P.reduce(children, async (acc, org) => {
      return acc.concat(await this.getDescendants(org));
    }, []);
    return children.concat(descendants);
  }
}

export default OrganizationService;
