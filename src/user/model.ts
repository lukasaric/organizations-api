import {
  Entity,
  Enum,
  PrimaryKey,
  Property,
  Unique
} from '@mikro-orm/core';
import { Role } from '../auth/roles';

@Entity()
class User {
  @PrimaryKey()
  id: number;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  @Unique()
  email: string

  @Enum()
  role: Role;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(firstName: string, lastName: string, email: string, role: Role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
  }
}

export default User;
