require('./db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adventureSchema = new Schema({
	_id:Schema.Types.ObjectId
},{strict: true});

var companySchema = new Schema({
	name:String,
	contactName:{
		type:String,
		select:false
	},
	pageName: String, 
	description:String,
	activities:	[{
		id:Number,
		name: String
	}],
	phone:{
		type:String,
		select:false
	},
	ownerId:{
		type: Schema.Types.ObjectId,
		select: false
	},
	adventures:{
		type:[adventureSchema],
		select:false
	},
	adventuresCount:Number,
	profile_picture:{
		imageId:Schema.Types.ObjectId,
		url:String
	},
	created_at:{
		type:Date,
		default:Date.now
	},
	updated_at:{
		type:Date,
		default:Date.now
	},
	leads: Number,
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

var Model = mongoose.model('Company', companySchema);


module.exports = Model;