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
		console.log(data, "created person")
		Household
		.findOneAndUpdate(
			{_id: data.householdId},
			{$push: {peopleArray: data._id}},
			{upsert: true})
		.then((data) => {
			console.log("then", data)
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
	console.log(body, "first check")
	Person
	.findOneAndUpdate(
		{_id: body.personId},
		{resourceAmount: body.resourceBalance},
		{new: true})
	.then((data) => {
		// console.log(data, "data")
		Household
		.findOneAndUpdate(
			{_id: data.householdId},
			{$push: {totalResources: data.resourceAmount}},
			{new: true})
		.then((data) => {
			console.log("then", data)
			res.json(data)
		})
	})
	.catch(err)
}

// ADDS INCOME TO PERSON AND MONTHLY INCOME TO HOUSEHOLD
module.exports.addIncome = ({body}, res, err) => {
	// console.log(body, "first check")
	Person
	.findOneAndUpdate(
		{_id: body.personId},
		{employerName: body.employer,
		payFrequency: body.payFrequency,
		payArray: body.payStubs,
		monthlyIncome: body.monthlyIncome},
		{new: true})
	.then((data) => {
		console.log(data, "income data")
		Household
		.findOneAndUpdate(
			{_id: data.householdId},
			{$push: {totalCountableIC: data.monthlyIncome}},
			{upsert: true})
		.then((data) => {
			console.log(data, "data from monthly")
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
		console.log(data, 'person by hh')
		res.json(data)
	})
	.catch(err)
}
