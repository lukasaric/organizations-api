import Organization from '../organization/model';
import User from '../user/model';

declare module 'express' {
  interface Request {
    user: User;
    organization: Organization;
  }
}
