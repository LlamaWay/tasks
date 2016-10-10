require('./db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var packageSchema = new Schema({
	companyId: Schema.Types.ObjectId,
	dischargeLeads: Number,
	exposition: Number,
	price: Number,
	createdDate:{
		type:Date,
		default:Date.now
	},
	dischargeDate:Date,
	closeDate:Date,
	state:{
		type:Number,
		default:0
	},
	period: String //monthly - yearly
});

var Model = mongoose.model('packages', packageSchema);
module.exports = Model;