var mongoose = require('mongoose');

var sandBox = 'mongodb://llamita:polaquitatocona@aws-us-east-1-portal.10.dblayer.com:11261/dev';
//var sandBox = 'mongodb://ultrallama:llamaalhornoconpapas@aws-us-east-1-portal.11.dblayer.com:27948/prod';
//var sandBox = 'mongodb://llamita:polaquitatocona@aws-us-east-1-portal.11.dblayer.com:27948/staging';
var uri = process.env.CONNECTION || sandBox;

if(process.env.CONNECTION){
	console.log('Mongodb connection from env');
}

if(uri){
	console.log('Utilizando la base: ' + uri);
}

mongoose.connect(uri,function (err) {
	if(err){ 
		console.error('mongoose connection error'); 
	}else{
		console.log(process.env.CONNECTION)
		console.log('alta conexión')
	}
});