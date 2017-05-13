'use strict';
const { json } = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(json());
mongoose.Promise = Promise;

const Person = require('../models/personMdl');
const Household = require('../models/householdMdl')

module.exports.addPerson = ({body}, res, err) => {
	Person
	.create(body)
	.then((data) => {
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

module.exports.getAllPersons = (req, res, err) => {
	Person
	.find()
	.then((person) => {
		res.json(person)
	})
	.catch(err)
}

module.exports.addResource = ({body}, res, err) => {
	console.log(body, "first check")
	Person
	.findOneAndUpdate(
		{_id: body.personId},
		{resourceType: body.resourceType,
		resourceAmount: body.resourceBalance},
		{upsert: true})
	.then((data) => {
		console.log(data, "data")
	// 	// Household
	// 	// .findOneAndUpdate(
	// 	// 	{_id: data.householdId},
	// 	// 	{$push: {peopleArray: data._id}},
	// 	// 	{upsert: true})
	// 	// .then((data) => {
	// 	// 	console.log("then", data)
	// 	// 	res.json(data)
	// 	// })
	})
	.catch(err)
}

module.exports.addIncome = ({body}, res, err) => {
	console.log(body, "first check")
	Person
	.findOneAndUpdate(
		{_id: body.personId},
		{employerName: body.employer,
		payFrequency: body.payFrequency,
		payArray: body.payStubs,
		monthlyIncome: body.monthlyIncome},
		{upsert: true}
	)
	.then((data) => {
		console.log(data, "income data")
		res.json(data)
	})
	.catch(err)
}

module.exports.getPersonById = ({params: {id}}, res, err) => {
	Person
	.findById({id},
		'_id', 'hasResource', 'hasEmployer')
	.then((data) => {
		res.json(data)
	})
	.catch(err)
}

module.exports.getPersonByHousehold = ({params: {id}}, res, err) => {
	Person
	.find({householdId: id})
	.then((data) => {
		console.log('person by hh')
		res.json(data)
	})
	.catch(err)
}
