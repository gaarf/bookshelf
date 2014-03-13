var _         = require('lodash');
var deepEqual = require('assert').deepEqual;

module.exports = function (bookshelf) {
  var Author, objs = require('../helpers/objects');

  describe('relationships plugin', function () {
    before(function() {
      bookshelf.plugin('relationships');
      Author = objs(bookshelf).Models.Author;
    });

    var want = ['site', 'photo', 'posts', 'ownPosts', 'blogs']
    want.sort();

    it('works on a contructor', function () {
      deepEqual( Author.relationships(), want );
    });

    it('works on an instance', function () {
      deepEqual( Author.forge().relationships(), want );
    });

    it('loadAll gets all relations', function (done) {
      var foo = new Author();
      foo.loadAll().then(function() {
        deepEqual( _(foo.relations).keys().sort().value(), want );
        done();
      });
    }); 

  });
};
