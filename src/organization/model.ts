import {
  Collection,
  Entity,
  ManyToOne,
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

  @Property({ nullable: true })
  parentId: number;

  @ManyToOne({ fieldName: 'id' })
  organization!: Organization

  @OneToMany(() => Membership, it => it.organization, { orphanRemoval: true })
  memberships = new Collection<Membership>(this);

  @OneToMany(() => Organization, it => it.organization, { orphanRemoval: true })
  children = new Collection<Organization>(this);

  constructor(name: string, parentId: number) {
    super();
    this.name = name;
    this.parentId = parentId;
  }
}

export default Organization;
