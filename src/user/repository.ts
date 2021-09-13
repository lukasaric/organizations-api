import { EntityRepository } from '@mikro-orm/postgresql';
import { IContainer } from 'bottlejs';
import IUserRepository from './interfaces/repository';
import { Repository } from '@mikro-orm/core';
import User from './model';

@Repository(User)
class UserRepository extends EntityRepository<User> implements IUserRepository {
  async update(user: User, data: Partial<User>): Promise<void> {
    this.assign(user, data);
    return this.persistAndFlush(user);
  }

  save(data: Partial<User>): Promise<void> {
    const user = this.create(data);
    return this.persistAndFlush(user);
  }
}

function Factory({ db }: IContainer): UserRepository {
  return db.provider.em.getRepository(User);
}

export default Factory;
