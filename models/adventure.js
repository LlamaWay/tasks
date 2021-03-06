require('./db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//https://github.com/Automattic/mongoose/issues/1630

var indexName = 'llamaway';
var typeName = 'adventures';

var adventureSchema = new Schema({
	name:String,
	activityType:[{
		id:Number,
		name: String
	}],
	description:String,
	place:String,
	takeDays:Boolean,
	duration:Number,
	difficulty:Number,
	price:Number,
	startDate:Date,	
	finishDate:Date,
	companyId:Schema.Types.ObjectId,
	ownerId:{
		type: Schema.Types.ObjectId,
		select: false
	},
	created_at:{
		type:Date,
		default:Date.now
	},
	updated_at:{
		type:Date,
		default:Date.now
	},
	profile_picture:[{
		imageId:Schema.Types.ObjectId,
		url:String
	}],
	adventurePictureCount:Number,
	currency: Number,
	payMethod:[{
		id:Number,
		name: String
	}],
	golocation:{
	    formatted_address : String,
		address_components: {
	        administrative_area_level_1: String,
	        administrative_area_level_2: String,
	        locality: String,
	        country: String
		},
		location: {
			lat: Number,
			lng: Number
		} 
	},
	location:{
		address: String,
		coords: {
			lat: String,
			lng: String
		} 
	},
	_geoloc: {
		lat: Number,
		lng: Number
	}	
});

module.exports = mongoose.model('Adventure', adventureSchema);