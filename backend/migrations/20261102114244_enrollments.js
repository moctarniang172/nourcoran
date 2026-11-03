exports.up = function (knex) {
  return knex.schema.createTable('enrollments', (table) => {
    table.increments('id');
    table.integer('user_id').unsigned().notNullable();
    table.integer('cours_id').unsigned().notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');

    table.foreign('cours_id').references('id').inTable('cours').onDelete('CASCADE').onUpdate('CASCADE');

    table.unique(['user_id', 'cours_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('enrollments');
};