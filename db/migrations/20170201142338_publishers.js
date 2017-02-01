
exports.up = function(knex, Promise) {
  return knex.schema.createTable('publishers', function(table){
    table.increments();
    table.string('name');
    table.string('country');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("publishers");
};
