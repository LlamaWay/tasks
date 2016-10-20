var async = require('async');

var Company = require('./models/company');
var Adventure = require('./models/adventure');
var searchClient = require('./scripts/search');

var geocoder = require('geocoder');
var similarity = require("similarity")

var options = {
  provider: 'google',
  key: 'AIzaSyDZL95pQHjWYOszZIN0uxA7Ktiob9rKdzY', // for Mapquest, OpenCage, Google Premier 
  language:'es'
};

geocoder.selectProvider(options.provider);

(function() {
    var getAddressComponents = function (idetails) {
        if (!idetails) {
            return {};
        }

        var location =  {
            "formatted_address": idetails.formatted_address,
            "location": {
                "lat": idetails.geometry.location.lat,
                "lng":idetails.geometry.location.lng
            },
            "address_components":{}
        };

        idetails.address_components.find(function(el, index) {
            el.types.find(function (el2, index) {
                if (el2 === 'administrative_area_level_1') {
                    location.address_components.administrative_area_level_1 = el.long_name;
                } else if (el2 === 'administrative_area_level_2') {
                    location.address_components.administrative_area_level_2 = el.long_name;
                } else if (el2 === 'locality') {
                    location.address_components.locality = el.long_name;
                } else if (el2 === 'country') {
                    location.address_components.country = el.long_name;
                }
            });
        });

        return location;
    }
/*
    Company.find({'location':{$exists:true}, 'golocation':{$exists:false}}, function(err, companies){
        if(err){
            console.error('Error to find companies', err);
            console.error('Stack: ', err.stack);
        }else{
            console.log("Cantidad de compañias: " + companies.length);
            async.each(companies, function(currentItem, callback) {
                geocoder.reverseGeocode(currentItem.location.coords.lat, currentItem.location.coords.lng, function ( err, data ) {
                    if(err){
                        console.error(err);
                    }
                    var exists = data.results.some(function(location){
                        if(currentItem.location.address == location.formatted_address){
                            currentItem.golocation = getAddressComponents(location);
                            currentItem.save(function (err) {
                                if (err) return console.error(err);
                                searchClient.indexCompany(currentItem.toJSON());
                                callback();
                            });
                            return true;
                        }
                        location.similarity = similarity(currentItem.location.address, location.formatted_address)
                        return false;
                    });
                    if(!exists){
                        var moreSimilar = {
                            similary: 0
                        };
                        data.results.forEach(function(location){
                            if(location.similarity > moreSimilar.similary){
                                moreSimilar.location = location;
                                moreSimilar.similary = location.similarity ;
                            }
                        });

                        currentItem.golocation = getAddressComponents(moreSimilar.location);
                        currentItem.save(function (err) {
                            if (err) return console.error(err);
                            searchClient.indexCompany(currentItem.toJSON());
                            callback();
                        });
                    }
                }, options);

            }, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    }).catch(function(err){
        process.exit(1);
    });
*/
 /*   Adventure.find({'location':{$exists:true}, 'golocation':{$exists:false}}, function(err, adventures){
        if(err){
            console.error('Error to find adventures', err);
            console.error('Stack: ', err.stack);
        }else{
            console.log("Cantidad de aventuras: " + adventures.length);
            async.each(adventures, function(currentItem, callback) {
                geocoder.reverseGeocode(currentItem.location.coords.lat, currentItem.location.coords.lng, function ( err, data ) {
                    if(err){
                        console.error(err);
                    }
                    var exists = data.results.some(function(location){
                        if(currentItem.location.address == location.formatted_address){
                            currentItem.golocation = getAddressComponents(location);
                            currentItem.save(function (err) {
                                if (err) return console.error(err);
                                searchClient.indexAdventure(currentItem.toJSON());
                                callback();
                            });
                            return true;
                        }
                        location.similarity = similarity(currentItem.location.address, location.formatted_address)
                        return false;
                    });
                    if(!exists){
                        var moreSimilar = {
                            similary: 0
                        };
                        data.results.forEach(function(location){
                            if(location.similarity > moreSimilar.similary){
                                moreSimilar.location = location;
                                moreSimilar.similary = location.similarity ;
                            }
                        });

                        currentItem.golocation = getAddressComponents(moreSimilar.location);
                        currentItem.save(function (err) {
                            if (err) return console.error(err);
                            searchClient.indexAdventure(currentItem.toJSON());
                            callback();
                        });
                    }
                }, options);

            }, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    }).catch(function(err){
        process.exit(1);
    });
*/
})();
