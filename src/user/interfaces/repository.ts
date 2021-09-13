import {
  EntityData,
  FilterQuery,
  FindOneOptions,
  FindOptions
} from '@mikro-orm/core';
import User from '../model';

interface IUserRepository {
  findOne(
    where: FilterQuery<User>,
    options?: FindOneOptions<User>
  ): Promise<User | null>;
  findAll(options?: FindOptions<User>): Promise<User[]>;
  persistAndFlush(user: User | User[]): Promise<void>;
  flush(): Promise<void>;
  assign(user: User, data: EntityData<User>): User;
}

export default IUserRepository;
