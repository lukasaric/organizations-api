import { ValuesType } from 'utility-types';

const organizationRoles = {
  PROFESSOR: 'PROFESSOR',
  LEARNER: 'LEARNER'
} as const;

export type OrganizationRole = ValuesType<typeof organizationRoles>;

export default organizationRoles;
