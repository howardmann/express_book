var Fan = require('../models/Fan');

exports.index = function(req, res, next) {
  Fan
    .query()
    .eager('[author, author.publisher]')
    .then(function(data){
      res.json({
        fans: data
      });
    }, next);
};

exports.show = function(req, res, next) {
  Fan
    .query()
    .findById(req.params.id)
    .eager('[author, author.publisher]')
    .then(function(data){
      res.json({
        fan: data
      });
    }, next);
};
