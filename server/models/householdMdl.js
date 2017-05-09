'use strict';
const { json } = require('body-parser');
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

const householdSchema = {
	'zipcode': String,
	'numberOfMembers': Number,
	'shelterType': String,
	'shelterPayFrequency': String,
	'shelterCost': Number,
	'paysSUA': Boolean,
	'totalCountableIC': Number,
	'totalResources': Number
}

const Household = mongoose.model('Household', householdSchema);

module.exports = Household;
