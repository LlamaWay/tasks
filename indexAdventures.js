var async = require('async');

var algolia = require('./scripts/search');

var Adventures = require('./models/adventure');

(function() {
    adventure.find({}, function(err, adventures) {
        async.each(adventures, function(currentItem, callback) {
            algolia.indexAdventure(currentItem.toJSON());
        }, function(err) {
            if (err) {
                console.log(err);
            }
            process.exit(1);
        });
    });
})();
