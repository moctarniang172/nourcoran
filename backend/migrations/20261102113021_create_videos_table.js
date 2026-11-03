exports.up = function (knex) {
  return knex.schema.createTable('videos', (table) => {
    table.increments('id');
    table.integer('cours_id').unsigned().notNullable();
    table.string('titre', 200).notNullable();
    table.string('video_url', 500).notNullable();
    table.integer('duree').unsigned().notNullable().defaultTo(0);
    table.integer('ordre').unsigned().notNullable();
    table.timestamps(true, true);

    table.foreign('cours_id').references('id').inTable('cours').onDelete('CASCADE').onUpdate('CASCADE');
    table.unique(['cours_id', 'ordre']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('videos');
};