var algoliasearch = require('algoliasearch');
/*DEV*/
var sandBoxAppId = process.env.ALGOLIA_APP_ID || "DH79J7IGKQ" ;
var sandBoxKey = process.env.ALGOLIA_KEY || "372091ee45679a912815813358a31fe5";
/*PROD*/
//var sandBoxAppId = process.env.ALGOLIA_APP_ID || "9QEN1J8TQS";
//var sandBoxKey = process.env.ALGOLIA_KEY || "f6bb0fc489a1701ffb8c45c505532331";

var client = algoliasearch(sandBoxAppId, sandBoxKey);

var adventureIndex = client.initIndex('adventures');

adventureIndex.setSettings({
    attributesToIndex: ['activityType.name', 'location.address', 'name'],
    attributesForFaceting: ['activityType.id','activityType.name', 'location.address', 'difficulty'],
    customRanking: ['desc(name)']
});

var indexObj = function(obj, index){
	obj.objectID = obj._id;

    index.partialUpdateObject(obj, function(err, content) {
        if(err){
            console.error('err index', obj._id,err);
            return;
        }else{
        	console.error('index ok', obj._id);
        }
    });
}

exports.indexAdventure = function(adventure) {
	return indexObj(adventure, adventureIndex)
}