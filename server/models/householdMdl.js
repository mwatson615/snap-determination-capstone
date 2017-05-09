'use strict';
const { json } = require('body-parser');
const mongoose = require('mongoose'),
	Schema = mongoose.Schema


const householdSchema = {
	'zipcode': String,
	'numberOfMembers': Number,
	'shelterType': String,
	'shelterPayFrequency': String,
	'shelterCost': Number,
	'paysSUA': Boolean,
	'totalCountableIC': Number,
	'totalResources': Number,
	'peopleArray': [{type: Schema.Types.ObjectId, ref: 'Person'}]
}

const Household = mongoose.model('Household', householdSchema);

module.exports = Household;
