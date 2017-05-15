'use strict';
const { json } = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(json());
mongoose.Promise = Promise;

const { getArraySum, resourceTest, convertHousing, grossTest, earnedICDed, getStd, getSua, netTest, oneThird, getFinalBenefit} = require('./logicCtrl')

const Household = require('../models/householdMdl');

module.exports.addHousehold = ({body}, res, next) => {
	Household
	.create(body)
	.then((data) => {
		res.json(data)
	})
}

module.exports.getAllHouseholds = (req, res, next) => {
	Household
	.find()
	.then((households) => {
		res.json(households)
	})
}

module.exports.getHouseholdZip = ({params: {zip}}, res, err) => {
	Household
	.find({zipcode: zip})
	.then((data) => {
		res.json(data)
	})
}

module.exports.addShelter = ({body}, res, err) => {
	Household
	.findOneAndUpdate(
		{_id: body.householdId},
		{shelterType: body.shelterType,
		shelterPayFrequency: body.shelterPayFrequency,
		shelterCost: body.shelterCost,
		paysSUA: body.paysSUA},
		{upsert: true})
	.then((data) => {
		res.json(data)
	})
	.catch(err)
}

module.exports.getHouseholdById = ({params: {id}}, res, err) => {
	Household
	.find({_id: id})
	.then((data) => {
		res.json(data)
	})
}

module.exports.getHouseholdByPerson = ({params: {id}}, res, err) => {
	
	console.log('hh by person')
	Household
	.find({peopleArray: id})
	.then((data) => {
		res.json(data)
	})
	.catch(err)
}

module.exports.getHouseholdResults = ({params: {id}}, res, err) => {
	console.log('hh results')
	Household
	.find({_id: id})
	.then((data) => {
		let householdSize = data[0].peopleArray.length;
		let resourceSum = getArraySum(data[0].totalResources)
		console.log(resourceSum)
		res.json(data)
	})
	.catch(err)
}
