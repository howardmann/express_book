var Publisher = require('../models/Publisher');

exports.index = function(req, res, next) {
  Publisher
    .query()
    .eager('authors')
    .then(function(data){
      res.json({
        data: data.map(function(publisher){
          return {
            type: 'publishers',
            id: publisher.id,
            attributes: {
              name: publisher.name,
              country: publisher.country
            },
            relationships: {
              authors: {
                data: publisher.authors.map(function(author){
                  return {type: 'authors', id: author.id}
                })
              }
            },
            included: publisher.authors.map(function(author){
              return {
                type: 'authors',
                id: author.id,
                attributes: {
                  name: author.name,
                  age: author.age
                }
              }
            })
          }
        })
      });
    }, next);
};

exports.show = function(req, res, next) {
  Publisher
    .query()
    .findById(req.params.id)
    .eager('authors')
    .then(function(publisher){
      res.json({
        data: {
          type: 'publishers',
          id: publisher.id,
          attributes: {
            name: publisher.name,
            country: publisher.country
          },
          relationships: {
            authors: {
              data: publisher.authors.map(function(author){
                return {type: 'authors', id: author.id}
              })
            }
          },
          included: publisher.authors.map(function(author){
            return {
              type: 'authors',
              id: author.id,
              attributes: {
                name: author.name,
                age: author.age
              }
            }
          })
        }
      })
    }, next)
};
