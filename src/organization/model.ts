import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique
} from '@mikro-orm/core';
import BaseEntity from '../shared/database/base-entity';
import Membership from './membership/model';

@Entity()
class Organization extends BaseEntity {
  @Property()
  @Unique()
  name: string;

  @OneToMany(() => Membership, it => it.organization, { orphanRemoval: true })
  memberships = new Collection<Membership>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export default Organization;
