import { EntityData } from '@mikro-orm/core';
import User from '../model';

export type UserDTO = Partial<EntityData<User>>;
