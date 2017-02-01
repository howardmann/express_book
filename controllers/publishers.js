var Publisher = require('../models/Publisher');
var _ = require('underscore');

exports.index = function(req, res, next) {
  Publisher
    .query()
    .eager('[authors, authors.books]')
    .then(function(data){
      // res.json(data);
      var booksArr = _.chain(data).pluck('authors').flatten().pluck('books').flatten().value();
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
              },
              books: {
                data: booksArr.map(function(book){
                  return {type: 'books', id: book.id}
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
            }).concat(booksArr.map(function(book){
              return {
                type: 'books',
                id: book.id,
                attributes: {
                  title: book.title,
                  description: book.description
                }
              }
            }))
          }
        })
      });
    }, next);
};

exports.show = function(req, res, next) {
  Publisher
    .query()
    .findById(req.params.id)
    .eager('[authors, authors.books]')
    .then(function(publisher){
      var booksArr = _.chain(publisher.authors).pluck('books').flatten().value();
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
            },
            books: {
              data: booksArr.map(function(book){
                return {type: 'books', id: book.id}
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
          }).concat(booksArr.map(function(book){
            return {
              type: 'books',
              id: book.id,
              attributes: {
                title: book.title,
                description: book.description
              }
            }
          }))
        }
      })
    }, next)
};
