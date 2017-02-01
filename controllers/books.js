var Book = require('../models/Book');

exports.index = function(req, res, next) {
  Book
    .query()
    .eager('[author, author.publisher]')
    .then(function(data){
      res.json({
        data: data.map(function(book){
          return {
            type: 'books',
            id: book.id,
            attributes: {
              title: book.title,
              description: book.description
            },
            relationships: {
              author: {
                data: {type: 'authors', id: book.author.id}
              },
              publisher: {
                data: {type: 'publishers', id: book.author.publisher.id}
              }
            },
            included: [
              {
                type: 'authors',
                id: book.author.id,
                attributes: {
                  name: book.author.name,
                  age: book.author.age
                }
              },
              {
                type: 'publishers',
                id: book.author.publisher.id,
                attributes: {
                  name: book.author.publisher.name,
                  country: book.author.publisher.country
                }
              }
            ]
          }
        })
      });
    }, next);
};

exports.show = function(req, res, next) {
  Book
    .query()
    .findById(req.params.id)
    .eager('[author, author.publisher]')
    .then(function(book){
      res.json({
        data: {
          type: 'books',
          id: book.id,
          attributes: {
            title: book.title,
            description: book.description
          },
          relationships: {
            author: {
              data: {type: 'authors', id: book.author.id}
            },
            publisher: {
              data: {type: 'publishers', id: book.author.publisher.id}
            }
          },
          included: [
            {
              type: 'authors',
              id: book.author.id,
              attributes: {
                name: book.author.name,
                age: book.author.age
              }
            },
            {
              type: 'publishers',
              id: book.author.publisher.id,
              attributes: {
                name: book.author.publisher.name,
                country: book.author.publisher.country
              }
            }
          ]
        }
      })
    }, next)
};
