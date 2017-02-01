var Model = require('objection').Model;
var Author = require('./Author');

// Extends Model constructor.
function Publisher() {
  Model.apply(this, arguments);
}

Model.extend(Publisher);
module.exports = Publisher;

// Table name is the only required property;
Publisher.tableName = 'publishers';

// This object defines the relations to other models
// relationMappings
Publisher.relationMappings = {
  authors: {
    relation: Model.HasManyRelation,
    // The related model. This can be either a Model subclass constructor or an
    // absolute file path to a module that exports one.
    modelClass: Author,
    join: {
      from: 'publishers.id',
      to: 'authors.publisher_id'
    }
  }
};
