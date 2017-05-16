'use strict'

module.exports.getArraySum = (moneyArray) => {
	let sum = moneyArray.reduce(function(acc, val) {
		return acc + val;
		}, 0);
	return sum;
	}

let shelterMult = 1;

module.exports.convertHousing = (shelterFreq, shelterCost) => {
	if (shelterFreq === 'weekly') {
		shelterMult = 4.3
	} else if (shelterFreq === 'biweekly') {
		shelterMult = 2.15
	}
	let monthlyShelter = shelterCost * shelterMult;
	return monthlyShelter;
}

const earnedDed = .20; //percent

module.exports.earnedICDed = (grossIC) => {
	let ded = grossIC * earnedDed;
	let result = grossIC - ded;
	return result;
}

//max shelter ded is 517

module.exports.calcNet = (minusEID, std) => {
	return minusEID - std;
}

module.exports.shelterDed = (adjIncome, shelter, sua) => {
	let shelterSum = shelter + sua;
		if (shelterSum > 517) {
			shelterSum = 517;
		}
	let shelterDed = shelterSum - (adjIncome / 2)
	return shelterDed;
}

module.exports.getNet = (adjIncome, shelterDed) => {
	return adjIncome - shelterDed;
}

module.exports.oneThirdCalc = (netIncome) => {
	let benefit = netIncome * .3
	return Math.ceil(benefit)
}
