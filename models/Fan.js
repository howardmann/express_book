var Model = require('objection').Model;

// Extends Model constructor.
function Fan() {
  Model.apply(this, arguments);
}

Model.extend(Fan);
module.exports = Fan;
// Table name is the only required property;
Fan.tableName = 'fans';

// This object defines the relations to other models
Fan.relationMappings = {
  author: {
    relation: Model.BelongsToOneRelation,
    // We use __dirname to avoid require loops
    modelClass: __dirname + '/Author',
    join: {
      from: 'fans.author_id',
      to: 'authors.id'
    }
  }
};
