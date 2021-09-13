import { EntityData, FilterQuery, FindOneOptions, FindOptions } from '@mikro-orm/core';
import { DatabaseProvider } from '../shared/database';
import { IContainer } from 'bottlejs';
import IUserRepository from './interfaces/repository';
import User from './model';

class UserRepository implements IUserRepository {
  #dbProvider: DatabaseProvider;

  constructor({ db }: IContainer) {
    this.#dbProvider = db.provider;
  }

  findOne(where: FilterQuery<User>, options?: FindOneOptions<User>): Promise<User | null> {
    const repository = this.#dbProvider.em.getRepository(User);
    return repository.findOne(where, options);
  }

  findAll(options?: FindOptions<User>): Promise<User[]> {
    const repository = this.#dbProvider.em.getRepository(User);
    return repository.findAll(options);
  }

  persistAndFlush(user: User | User[]): Promise<void> {
    const repository = this.#dbProvider.em.getRepository(User);
    return repository.persistAndFlush(user);
  }

  flush(): Promise<void> {
    const repository = this.#dbProvider.em.getRepository(User);
    return repository.flush();
  }

  assign(user: User, data: EntityData<User>): User {
    const repository = this.#dbProvider.em.getRepository(User);
    return repository.assign(user, data);
  }
}

export default UserRepository;
