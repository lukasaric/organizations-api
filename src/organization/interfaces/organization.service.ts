import Organization from '../model';

interface IOrganizationService {
  getDescendants(organization: Organization): Promise<Organization[]>;
  getChildren(parentId: number): Promise<Organization[]>;
}

export default IOrganizationService;
