'use strict';
const { json } = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(json());
mongoose.Promise = Promise;

const { getStd, getSua, getFinalBenefit} = require('./logicCtrl')

const { getArraySum, convertHousing, earnedICDed, shelterDed, getNet, oneThirdCalc, calcNet } = require('./calcCtrl')

const { resourceTest, grossTest, netTest } = require('./testCtrl')

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
		// console.log(resourceSum, "resource sum")
		let incomeSum = getArraySum(data[0].totalCountableIC)
		console.log(incomeSum, "gross sum")

		let resourceEligible = resourceTest(resourceSum)
		// console.log(resourceEligible, "res elig")

		let grossEligible = grossTest(householdSize, incomeSum)
		console.log(grossEligible, "gross eligible")

		let minusEID = earnedICDed(incomeSum)
		console.log(minusEID, "income minus eid")
		let monthlyShelter = convertHousing(data[0].shelterPayFrequency, data[0].shelterCost)
		console.log(monthlyShelter, "monthly shelter")

		let sua = getSua(householdSize, data[0].paysSUA)
		console.log(sua, "sua")

		let std = getStd(householdSize)
		console.log(std, "std")

		let adjustedIC = calcNet(minusEID, std)
		console.log(adjustedIC, "adjusted ic")

		let shelterDeduction = shelterDed(adjustedIC, monthlyShelter, sua)
		console.log(shelterDeduction, "shelter ded")

		let netIncome = getNet(adjustedIC, shelterDeduction)
		console.log(netIncome, "net income")

		let netEligible = netTest(householdSize, netIncome)
		console.log(netEligible, "net eligible")

		let oneThird = oneThirdCalc(netIncome)
		console.log(oneThird, "one third")

		let benefitAmount = getFinalBenefit(householdSize, oneThird)
		console.log(benefitAmount, "benefit amount")

		data[0].benefitAmount = benefitAmount;
		data[0].netEligible = netEligible;
		data[0].grossEligible = grossEligible;
		console.log(data[0], "data")
		res.json(data)
		})
	.catch(err)
}
