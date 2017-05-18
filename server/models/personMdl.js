'use strict';
const { json } = require('body-parser');
const mongoose = require('mongoose'),
	Schema = mongoose.Schema

const personSchema = {
	"householdId": {type: Schema.Types.ObjectId, ref: 'Household'},
	"firstName": String,
	"age": Number,
	"hasResource": Boolean,
	"resourceAmount": Number,
	"hasEmployer": Boolean,
	"employerName": String,
	"payArray": [Number],
	"payFrequency": String,
	"monthlyIncome": Number
}

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
