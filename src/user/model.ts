import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  Property,
  Unique
} from '@mikro-orm/core';
import BaseEntity from '../shared/database/base-entity';
import Membership from '../organization/membership/model';
import { Role } from './roles';

@Entity()
class User extends BaseEntity {
  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  @Unique()
  email: string

  @OneToMany(() => Membership, it => it.user)
  memberships = new Collection<Membership>(this);

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
