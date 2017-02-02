exports.seed = function(knex, Promise) {
  // Initial seed data
  var publishers = [
    {name: 'Random House', country: 'UK'},
    {name: 'Ali BaBa', country: 'China'},
    {name: 'Penguin', country: 'US'},
    {name: 'Harper Collins', country: 'Canada'}
  ];

  var authors = [
    {name: 'John Smith', age: 35, publisher_id: knex('publishers').where({name: 'Random House'}).select('id')},
    {name: 'Matt Cooper', age: 31, publisher_id: knex('publishers').where({name: 'Random House'}).select('id')},
    {name: 'Shi Ming', age: 55, publisher_id: knex('publishers').where({name: 'Ali BaBa'}).select('id')},
    {name: 'Cao Cao', age: 35, publisher_id: knex('publishers').where({name: 'Ali BaBa'}).select('id')},
    {name: 'Ming Shi', age: 35, publisher_id: knex('publishers').where({name: 'Ali BaBa'}).select('id')},
    {name: 'JK Rowling', age: 45, publisher_id: knex('publishers').where({name: 'Penguin'}).select('id')},
    {name: 'Jane Janet', age: 35, publisher_id: knex('publishers').where({name: 'Harper Collins'}).select('id')}
  ];

  var books = [
    {title: 'A long walk', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aspernatur odit asperiores, iste quaerat, totam.', author_id: knex('authors').where({name: 'John Smith'}).select('id')},
    {title: 'A short jog', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aspernatur odit asperiores, iste quaerat, totam.', author_id: knex('authors').where({name: 'John Smith'}).select('id')},
    {title: 'Penny flows', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aspernatur odit asperiores, iste quaerat, totam.', author_id: knex('authors').where({name: 'Matt Cooper'}).select('id')},
    {title: 'Wo Ai Ni', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aspernatur odit asperiores, iste quaerat, totam.', author_id: knex('authors').where({name: 'Shi Ming'}).select('id')},
    {title: 'Pan Duan', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aspernatur odit asperiores, iste quaerat, totam.', author_id: knex('authors').where({name: 'Cao Cao'}).select('id')},
    {title: 'San Guo Yan Yi', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aspernatur odit asperiores, iste quaerat, totam.', author_id: knex('authors').where({name: 'Ming Shi'}).select('id')},
    {title: 'Harry Potter', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aspernatur odit asperiores, iste quaerat, totam.', author_id: knex('authors').where({name: 'JK Rowling'}).select('id')},
    {title: 'World apart', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aspernatur odit asperiores, iste quaerat, totam.', author_id: knex('authors').where({name: 'Jane Janet'}).select('id')}
  ];

  // Adding fans based RESTful API format to test RESTAPI adapter serializer
  var fans = [
    {name: 'Harry Stiles', age: 10, author_id: knex('authors').where({name: 'John Smith'}).select('id')},
    {name: 'Groucho Marx', age: 6, author_id: knex('authors').where({name: 'John Smith'}).select('id')},
    {name: 'Harpo Marx', age: 12, author_id: knex('authors').where({name: 'Cao Cao'}).select('id')},
    {name: 'Nut Man', age: 3, author_id: knex('authors').where({name: 'Cao Cao'}).select('id')},
    {name: 'Caleb Jones', age: 5, author_id: knex('authors').where({name: 'Cao Cao'}).select('id')},
    {name: 'Mindy Mally', age: 40, author_id: knex('authors').where({name: 'JK Rowling'}).select('id')},
    {name: 'Joll Green', age: 35, author_id: knex('authors').where({name: 'JK Rowling'}).select('id')}
  ];

  return knex('books').del()
    .then(function(){
      return knex('fans').del();
    })
    .then(function(){
      return knex('authors').del();
    })
    .then(function(){
      return knex('publishers').del();
    })
    .then(function(){
      return knex('publishers').insert(publishers, 'id');
    })
    .then(function(){
      return knex('authors').insert(authors, 'id');
    })
    .then(function(){
      return knex('fans').insert(fans, 'id');
    })
    .then(function(){
      return knex('books').insert(books, 'id');
    })
};
