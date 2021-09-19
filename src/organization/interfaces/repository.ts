import {
  EntityData,
  FilterQuery,
  FindOneOptions,
  FindOptions,
  Populate
} from '@mikro-orm/core';
import Organization from '../model';

interface IOrganizationRepository {
  findOne(
    where: FilterQuery<Organization>,
    options?: FindOneOptions<Organization>
  ): Promise<Organization | null>;
  find(
    where: FilterQuery<Organization>,
    options?: FindOneOptions<Organization>
  ): Promise<Organization[]>;
  findAll(options?: FindOptions<Organization>): Promise<Organization[]>;
  persistAndFlush(organization: Organization | Organization[]): Promise<void>;
  assign(organization: Organization, data: EntityData<Organization>): Organization;
  populate(
    organization: Organization,
    populate: string | keyof Organization | Populate<Organization>
  ): Promise<Organization>;
}

export default IOrganizationRepository;
