'use strict';
const { json } = require('body-parser');
const mongoose = require('mongoose'),
	Schema = mongoose.Schema
// const autoIncrement = require('mongoose-auto-increment');

const personSchema = {
	"householdId": {type: Schema.Types.ObjectId, ref: 'Household'},
	"firstName": String,
	"age": Number,
	"hasSSN": Boolean,
	"hasResource": Boolean,
	"resourceType": [String],
	"resourceAmount": [Number],
	"hasEmployer": Boolean,
	"employerName": String,
	"payArray": {
		type: [Number],
		min: 2,
		max: 8
	}
}

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
