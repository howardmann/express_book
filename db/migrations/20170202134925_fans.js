
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fans', function(table){
    table.increments();
    table.string('name');
    table.integer('age');
    table.integer('author_id').unsigned().references('authors.id').onDelete('set null');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("fans");
};
