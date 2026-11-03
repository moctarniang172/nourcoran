exports.up = function (knex) {
  return knex.schema.createTable('cours', (table) => {
    table.increments('id');
    table.integer('categorie_id').unsigned().notNullable();
    table.string('titre', 200).notNullable();
    table.text('description').nullable();
    table
      .enu('niveau', ['debutant', 'intermediaire', 'avance'])
      .notNullable()
      .defaultTo('debutant');
    table.timestamps(true, true);

    table
      .foreign('categorie_id')
      .references('id')
      .inTable('categorie')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cours');
};