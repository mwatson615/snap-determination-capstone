'use strict';
const { json } = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(json());
mongoose.Promise = Promise;

const Person = require('../models/personMdl');

module.exports.addPerson = ({body}, res, err) => {
	console.log(body)
	Person
	.create(body)
	.then((data) => {
		res.json(data)
	})
}

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
// 	(err, data) => {
	// 		if (err) return res.status(500, {error: err});
	// 		return res.send('resources updated')
	// }

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

module.exports.getPersonByHousehold = ({params: {id}}) => {
	Person
	.find(
		{householdId: id})
}
