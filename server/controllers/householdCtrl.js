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
	Household
	.find({peopleArray: id})
	.then((data) => {
		res.json(data)
	})
	.catch(err)
}

module.exports.getHouseholdResults = ({params: {id}}, res, err) => {
	Household
	.find({_id: id})
	.then((data) => {
		let dataObj = data[0].toObject()

		let householdSize = dataObj.peopleArray.length;
		let resourceSum = getArraySum(dataObj.totalResources)
		let incomeSum = getArraySum(dataObj.totalCountableIC)

		let resourceEligible = resourceTest(resourceSum)

		let grossEligible = grossTest(householdSize, incomeSum)

		let minusEID = earnedICDed(incomeSum)
		let monthlyShelter = convertHousing(dataObj.shelterPayFrequency, dataObj.shelterCost)

		let sua = getSua(householdSize, dataObj.paysSUA)

		let std = getStd(householdSize)

		let adjustedIC = calcNet(minusEID, std)

		let shelterDeduction = shelterDed(adjustedIC, monthlyShelter, sua)

		let netIncome = getNet(adjustedIC, shelterDeduction)

		let netEligible = netTest(householdSize, netIncome)

		let oneThird = oneThirdCalc(netIncome)

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
		res.json(dataObj)
		})
	.catch(err)
}
