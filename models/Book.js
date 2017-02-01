var Model = require('objection').Model;

// Extends Model constructor.
function Book() {
  Model.apply(this, arguments);
}

Model.extend(Book);
module.exports = Book;
// Table name is the only required property;
Book.tableName = 'books';

// This object defines the relations to other models
Book.relationMappings = {
  author: {
    relation: Model.BelongsToOneRelation,
    // We use __dirname to avoid require loops
    modelClass: __dirname + '/Author',
    join: {
      from: 'books.user_id',
      to: 'authors.id'
    }
  }
};
