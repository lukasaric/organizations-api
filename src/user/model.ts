import {
  Entity,
  Enum,
  Property,
  Unique
} from '@mikro-orm/core';
import BaseEntity from '../shared/database/base-entity';
import { Role } from '../auth/roles';

@Entity()
class User extends BaseEntity {
  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  @Unique()
  email: string

  @Enum()
  role: Role;

  constructor(firstName: string, lastName: string, email: string, role: Role) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
  }
}

export default User;
