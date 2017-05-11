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
	// console.log(body)
	Person
	.create(body)
	.then((data) => {
		res.json(data)
		// let people = [];
		// people.push(data._id)
		// console.log(data)
		// Household
		// .find(
		// 	{id: data.householdId})
		// .populate({peopleArray: data._id})
		// .then((data) => {
		// 	console.log(data, "then")
		// 	res.json(data)
		})
		.catch(err)
	}
// const popPersonArray = (personId) => {
// Household
// .find()
// .populate({
// 	path: 'person',
// 	match: { }
// })
// }

module.exports.getAllPersons = (req, res, err) => {
	Person
	.find()
	.then((person) => {
		res.json(person)
	})
}

module.exports.addResource = ({body}, res, err) => {
	Person
	.findOneAndUpdate(
		{_id: body.id},
		{resourceType: body.resourceType,
		resourceAmount: body.resourceAmount},
		{upsert: true}
	)
	.then((data) => {
		res.json(data)
	})
	.catch(err)
}

module.exports.addIncome = ({body}, res, err) => {
	Person
	.findOneAndUpdate(
		{_id: body.id},
		{employerName: body.employerName,
		payArray: body.payArray},
		{upsert: true}
	)
	.then((data) => {
		res.json(data)
	})
	.catch(err)
}

module.exports.getPersonByHousehold = ({params: {id}}, res, err) => {
	Person
	.find({householdId: id})
	.then((data) => {
		res.json(data)
	})
	.catch(err)
}
