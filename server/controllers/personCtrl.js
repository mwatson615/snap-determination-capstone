'use strict';
const { json } = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(json());
mongoose.Promise = Promise;

const Person = require('../models/personMdl');
const Household = require('../models/householdMdl')

//  CREATES ONE PERSON AND ADDS THEIR PERSON ID TO AN ARRAY
// OF HOUSEHOLD MEMBERS
module.exports.addPerson = ({body}, res, err) => {
	Person
	.create(body)
	.then((data) => {
		Household
		.findOneAndUpdate(
			{_id: data.householdId},
			{$push: {peopleArray: data._id}},
			{new: true})
		.then((data) => {
			res.json(data)
		})
		.catch(err)
	})
}
//  GETS ALL PEOPLE IN ALL HOUSEHOLDS
module.exports.getAllPersons = (req, res, err) => {
	Person
	.find()
	.then((person) => {
		res.json(person)
	})
	.catch(err)
}

//  ADDS RESOURCE INFO TO PERSON DOC AND THEN TOTAL 
//  RESOURCES TO A HOUSEHOLD ARRAY
module.exports.addResource = ({body}, res, err) => {
	Person
	.findOneAndUpdate(
		{_id: body.personId},
		{resourceAmount: body.resourceBalance},
		{new: true})
	.then((data) => {
		Household
		.findOneAndUpdate(
			{_id: data.householdId},
			{$push: {totalResources: data.resourceAmount}},
			{new: true})
		.then((data) => {
			res.json(data)
		})
	})
	.catch(err)
}

// ADDS INCOME TO PERSON AND MONTHLY INCOME TO HOUSEHOLD
module.exports.addIncome = ({body}, res, err) => {
	Person
	.findOneAndUpdate(
		{_id: body.personId},
		{employerName: body.employer,
		payFrequency: body.payFrequency,
		payArray: body.payStubs,
		monthlyIncome: body.monthlyIncome},
		{new: true})
	.then((data) => {
		Household
		.findOneAndUpdate(
			{_id: data.householdId},
			{$push: {totalCountableIC: data.monthlyIncome}},
			{upsert: true})
		.then((data) => {
			res.json(data)
		})
	})
	.catch(err)
}
// GETS ONE PERSON BY ID
module.exports.getPersonById = ({params: {id}}, res, err) => {
	Person
	.findById({id},
		'_id', 'hasResource', 'hasEmployer')
	.then((data) => {
		res.json(data)
	})
	.catch(err)
}
//  GETS ALL PEOPLE IN A HOUSEHOLD
module.exports.getPersonByHousehold = ({params: {id}}, res, err) => {
	Person
	.find({householdId: id})
	.then((data) => {
		res.json(data)
	})
	.catch(err)
}
// GETS ALL HH MEMBERS WHO HAVE RESOURCES
module.exports.getPersonResByHousehold = ({params: {id}}, res, err) => {
	Person
	.find({householdId: id})
	.where('age').gt(17)
	.where('hasResource').equals(true)
	.then((data) => {
		res.json(data)
	})
	.catch(err)
}
// GETS ALL HH MEMBERS WHO HAVE EMPLOYERS
module.exports.getPersonIncByHousehold = ({params: {id}}, res, err) => {
	Person
	.find({householdId: id})
	.where('age').gt(17)
	.where('hasEmployer').equals(true)
	.then((data) => {
		res.json(data)
	})
	.catch(err)
}
