var algoliasearch = require('algoliasearch');
/*DEV*/
var sandBoxAppId = process.env.ALGOLIA_APP_ID || "DH79J7IGKQ" ;
var sandBoxKey = process.env.ALGOLIA_KEY || "372091ee45679a912815813358a31fe5";

/*STAGING*/
//var sandBoxAppId = process.env.ALGOLIA_APP_ID || "90F2IXERZZ" ;
//var sandBoxKey = process.env.ALGOLIA_KEY || "c410656164e7eca229e56840e2da3cf0";

/*PROD*/
//var sandBoxAppId = process.env.ALGOLIA_APP_ID || "9QEN1J8TQS";
//var sandBoxKey = process.env.ALGOLIA_KEY || "f6bb0fc489a1701ffb8c45c505532331";

var client = algoliasearch(sandBoxAppId, sandBoxKey);

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

var adventureIndex = client.initIndex('adventures');

adventureIndex.setSettings({
    attributesToIndex: ['activityType.name', 'location.address', 'name'],
    attributesForFaceting: ['activityType.id','activityType.name', 'location.address', 'difficulty'],
    customRanking: ['desc(name)']
});

exports.indexAdventure = function(adventure) {
    return indexObj(adventure, adventureIndex)
}

var companyIndex = client.initIndex('companies');

companyIndex.setSettings({
    attributesToIndex: ['location.address', 'activities.id', 'name'],
    attributesForFaceting: ['activities.id', 'location.address'],
    customRanking: ['desc(name)']
});

exports.indexCompany = function(company) {
    return indexObj(company, companyIndex)
}