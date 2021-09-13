import { EntityRepository } from '@mikro-orm/postgresql';
import User from '../model';

interface IUserRepository extends EntityRepository<User> {
  update(user: User, data: Partial<User>): Promise<void>;
  save(data: Partial<User>): Promise<void>;
}

export default IUserRepository;
