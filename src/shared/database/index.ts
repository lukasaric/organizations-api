import {
  Connection,
  EventSubscriber,
  IDatabaseDriver,
  LoadStrategy,
  MikroORM
} from '@mikro-orm/core';
import autobind from 'auto-bind';
import { Config } from '../../config';
import entities from './entities';
import { IContainer } from 'bottlejs';
import p from 'bluebird';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export type DatabaseProvider = MikroORM<PostgreSqlDriver>;

class Db {
  #config: Config;
  #subscribers: EventSubscriber[]
  #provider?: DatabaseProvider;

  constructor({ config }: IContainer) {
    this.#config = config;
    this.#subscribers = [];
    autobind(this);
  }

  get provider(): MikroORM<PostgreSqlDriver> {
    if (!this.#provider) throw new Error('Database not connected');
    return this.#provider;
  }

  async connect(): Promise<MikroORM<IDatabaseDriver<Connection>>> {
    const { database } = this.#config;
    this.#provider = await MikroORM.init({
      ...database,
      loadStrategy: LoadStrategy.JOINED,
      subscribers: this.#subscribers,
      entities
    });
    return this.provider;
  }

  async reset(): Promise<void> {
    const { em } = this.provider;
    const entities = this.#provider.config.get('entities');
    await p.each(entities, async entity => {
      return em
        .createQueryBuilder(entity as string)
        .truncate()
        .execute();
    });
  }
}

export default Db;
