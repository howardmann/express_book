var Author = require('../models/Author');

exports.index = function(req, res, next) {
  Author
    .query()
    .eager('publisher')
    .then(function(data){
      res.json({
        data: data.map(function(author){
          return {
            type: 'authors',
            id: author.id,
            attributes: {
              name: author.name,
              age: author.age
            },
            relationships: {
              publisher: {
                data: {type: 'publishers', id: author.publisher.id}
              }
            },
            included: {
              type: 'publishers',
              id: author.publisher.id,
              attributes: {
                name: author.publisher.name,
                country: author.publisher.country
              }
            }
          }
        })
      });
    }, next);
};

exports.show = function(req, res, next) {
  Author
    .query()
    .findById(req.params.id)
    .eager('publisher')
    .then(function(author){
      res.json({
        data: {
          type: 'authors',
          id: author.id,
          attributes: {
            name: author.name,
            age: author.age
          },
          relationships: {
            publisher: {
              data: {type: 'publishers', id: author.publisher.id}
            }
          },
          included: {
            type: 'publishers',
            id: author.publisher.id,
            attributes: {
              name: author.publisher.name,
              country: author.publisher.country
            }
          }
        }
      })
    }, next)
};

exports.create = function(req, res, next) {
  let data = req.body.data;
  Author
    .query()
    .insertAndFetch({
      name: data.attributes.name,
      age: data.attributes.age,
      publisher_id: data.relationships.publisher.data.id
    })
    .eager('publisher')
    .then(function(author){
      res.json({
        data: {
          type: 'authors',
          id: author.id,
          attributes: {
            name: author.name,
            age: author.age
          },
          relationships: {
            publisher: {
              data: {
                type: 'publishers',
                id: author.publisher.id
              }
            }
          }
        }
      });
    }, next)
};
