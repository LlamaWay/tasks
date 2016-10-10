var async = require('async');

var Adventures = require('./models/adventure');
var algolia = require('./scripts/search');
/*
(function() {
    Adventures.find({price:{'$exists': false}, currency: 0}, function(err, adventures) {
        if(err){
          console.error(err);
          callback();
        }else{
          console.log(adventures.length);
          async.each(adventures, function(currentItem, callback) {
             currentItem['price'] = null;
             //currentItem.save(function(err, newAdventure) {
                  algolia.indexAdventure(currentItem.toJSON());
                  callback();
             //});
          }, function(err) {
              if (err) {
                  console.log(err);
              }
              //process.exit(1);
          });
        }
    });
})();
*/
(function() {
    Adventures.find({}, function(err, adventures) {
        if(err){
          console.error(err);
          callback();
        }else{
          async.each(adventures, function(currentItem, callback) {
             //currentItem.save(function(err, newAdventure) {
                  algolia.indexAdventure(currentItem.toJSON());
                  callback();
             //});
          }, function(err) {
              if (err) {
                  console.log(err);
              }
              //process.exit(1);
          });
        }
    });
})();
