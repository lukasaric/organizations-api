import { ValuesType } from 'utility-types';

const roles = {
  ADMIN: 'admin',
  USER: 'user'
} as const;

export type Role = ValuesType<typeof roles>;

export default roles;
