// Relationships plugin -
// adds a relationships method that attempts to parse other methods
// see https://github.com/tgriesser/bookshelf/issues/278
// -----
module.exports = function(Bookshelf) {
  "use strict";
  var _     = require('lodash');

  var Model = Bookshelf.Model.extend({

    relationships: function() {
      return _(this).methods()
        .filter(function(name){
          return this[name].toString().match(
/return\s+this\.(hasMany|hasOne|belongsTo|belongsToMany|morphOne|morphMany|morphTo)\(/
          );
        }, this)  
        .sort()
        .value();
    }

  , loadAll: function() {
      return this.load(this.relationships());
    }

  }, {

    relationships: function() {
      return this.forge().relationships();
    }

  });

  Bookshelf.Model = Model;
};