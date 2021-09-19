import Organization from '../model';

interface IOrganizationService {
  getDescendants(organization: Organization): Promise<Organization[]>;
  getChildren(organization: Organization): Promise<Organization[]>;
}

export default IOrganizationService;
