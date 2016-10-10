var async = require('async');

var Package = require('./models/package');

(function() {
    Package.find({ 'state': 1 }, function(err, packages) {
        async.each(packages, function(currentItem, callback) {
            currentItem.closeDate = new Date('11-01-2016');
            currentItem.save().then(function(item) {
                console.log("Exito guardando la compañia: " + item._id);
                callback();
            }).catch(function(item) {
                console.log("Error guardando la compañia: " + item._id);
                console.log(err);
                callback();
            });
        }, function(err) {
            if (err) {
                console.log(err);
            }
            process.exit(1);
        });
    });
})();
