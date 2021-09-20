import Organization from '../model';

interface IOrganizationService {
  getDescendants(organization: Organization): Promise<Organization[]>;
  getAncestors(organization: Organization): Promise<Organization[]>;
}

export default IOrganizationService;
