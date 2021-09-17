import {
  Entity,
  Enum,
  ManyToOne
} from '@mikro-orm/core';
import Organization from '../model';
import { OrganizationRole } from './roles';
import User from '../../user/model';

@Entity()
class Membership {
  @Enum()
  role: OrganizationRole;

  @ManyToOne({ primary: true })
  organization!: Organization

  @ManyToOne({ primary: true })
  user!: User;
}

export default Membership;
