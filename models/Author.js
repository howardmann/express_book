var Model = require('objection').Model;
var Book = require('./Book');

// Extends Model constructor.
function Author() {
  Model.apply(this, arguments);
}

Model.extend(Author);
module.exports = Author;
// Table name is the only required property;
Author.tableName = 'authors';

// This object defines the relations to other models
Author.relationMappings = {
  publisher: {
    relation: Model.BelongsToOneRelation,
    // We use __dirname to avoid require loops
    modelClass: __dirname + '/Publisher',
    join: {
      from: 'authors.publisher_id',
      to: 'publishers.id'
    }
  },
  books: {
    relation: Model.HasManyRelation,
    // The related model. This can be either a Model subclass constructor or an
    // absolute file path to a module that exports one.
    modelClass: Book,
    join: {
      from: 'authors.id',
      to: 'books.author_id'
    }
  }
};
