'use strict';
const { json } = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(json());
mongoose.Promise = Promise;

const Person = require('../models/personMdl');

module.exports.addPerson = ({body}, res, next) => {
	Person
	.create(body)
	.then((data) => {
		res.json(data)
	})
}

module.exports.getAllPersons = (req, res, next) => {
	Person
	.find()
	.then((person) => {
		res.json(person)
	})
}
