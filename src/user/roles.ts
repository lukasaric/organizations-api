import { ValuesType } from 'utility-types';

const roles = {
  ADMIN: 'ADMIN',
  USER: 'USER'
} as const;

export type Role = ValuesType<typeof roles>;

export default roles;
