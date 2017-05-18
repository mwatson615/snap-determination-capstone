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
		let dataObj = data[0].toObject()

		let householdSize = dataObj.peopleArray.length;
		let resourceSum = getArraySum(dataObj.totalResources)
		// console.log(resourceSum, "resource sum")
		let incomeSum = getArraySum(dataObj.totalCountableIC)
		console.log(incomeSum, "gross sum")

		let resourceEligible = resourceTest(resourceSum)
		// console.log(resourceEligible, "res elig")

		let grossEligible = grossTest(householdSize, incomeSum)
		console.log(grossEligible, "gross eligible")

		let minusEID = earnedICDed(incomeSum)
		console.log(minusEID, "income minus eid")
		let monthlyShelter = convertHousing(dataObj.shelterPayFrequency, dataObj.shelterCost)
		console.log(monthlyShelter, "monthly shelter")

		let sua = getSua(householdSize, dataObj.paysSUA)
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
		if (grossEligible === false || netEligible === false 
			|| resourceEligible === false) {
		benefitAmount = 0;
		}


		dataObj.householdSize = householdSize;
		dataObj.resourceEligible = resourceEligible;
		dataObj.resourceSum = resourceSum;
		dataObj.incomeSum = Math.round(incomeSum);
		dataObj.grossEligible = grossEligible;
		dataObj.netEligible = netEligible;
		dataObj.monthlyShelter = monthlyShelter
		dataObj.shelterDeduction = Math.round(shelterDeduction, -4);
		dataObj.benefitAmount = benefitAmount
		// console.log(dataObj, "data after stuff")
		res.json(dataObj)
		})
	.catch(err)
}
