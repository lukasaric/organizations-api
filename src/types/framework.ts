import User from '../user/model';

declare module 'express' {
  interface Request {
    user: User;
  }
}
