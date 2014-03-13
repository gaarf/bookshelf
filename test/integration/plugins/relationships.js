var _         = require('lodash');
var deepEqual = require('assert').deepEqual;

module.exports = function (bookshelf) {
  var Author, Tag;

  describe('relationships plugin', function () {
    before(function() {
      bookshelf.plugin('relationships');
      var objs = require('../helpers/objects')(bookshelf);
      Author = objs.Models.Author;
      Tag = objs.Models.Tag;
    });

    var want = ['site', 'photo', 'posts', 'ownPosts', 'blogs']
    want.sort();

    it('works on a contructor', function () {
      deepEqual( Author.relationships(), want );
    });

    it('loadAll gets all relations', function (done) {
      var foo = new Author();

      deepEqual( foo.relationships(), want );

      foo.loadAll().then(function() {
        deepEqual( _(foo.relations).keys().sort().value(), want );
        done();
      });
    }); 

    it('works on another instance', function () {
      deepEqual( Tag.forge().relationships(), ['posts'] );
    });

  });
};
