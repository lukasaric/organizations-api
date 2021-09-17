import { Migration } from '@mikro-orm/migrations';

export class Migration20210913135216 extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const setTimestamps = table => {
      table.timestamp('created_at', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now());
    };

    const createUserTable = knex.schema.createTable('user', table => {
      const USER_ROLES = ['ADMIN', 'USER'];
      table.increments('id');
      table.enum('role', USER_ROLES);
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique();
      setTimestamps(table);
    });

    const createOrganizationTable = knex.schema.createTable('organization', table => {
      table.increments('id');
      table.string('name').notNullable();
      setTimestamps(table);
    });

    const createMembershipTable = knex.schema
    .createTable('membership', table => {
      const ORGANIZATION_ROLES = ['PROFESSOR', 'LEARNER'];
      table.integer('organization_id').notNullable();
      table.integer('user_id').notNullable();
      table.enum('role', ORGANIZATION_ROLES);
      table.primary(['organization_id', 'user_id']);
      table.foreign('user_id')
        .references('user.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.foreign('organization_id')
        .references('organization.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      setTimestamps(table);
    });

    this.addSql(createUserTable.toQuery());
    this.addSql(createOrganizationTable.toQuery());
    this.addSql(createMembershipTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();
    this.addSql(knex.schema.dropTable('user').toQuery());
    this.addSql(knex.schema.dropTable('organization').toQuery());
    this.addSql(knex.schema.dropTable('membership').toQuery());
  }
}
