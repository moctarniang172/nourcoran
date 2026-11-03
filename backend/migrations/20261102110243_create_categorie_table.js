/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categorie', (table)=>{
    table.increments('id');
    table.string('nom', 100).notNullable().unique();
    table.string('slug', 120).notNullable().unique();
    table.text('description').nullable();
    table.timestamps(true, true);
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('categorie')
};
