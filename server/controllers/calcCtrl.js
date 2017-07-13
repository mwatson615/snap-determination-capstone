'use strict'

module.exports.getArraySum = (moneyArray) => {
	let sum = moneyArray.reduce(function(acc, val) {
		return acc + val;
		}, 0);
	return sum;
	}

module.exports.convertHousing = (shelterFreq, shelterCost) => {
	let shelterMult = 1;
	if (shelterFreq === 'weekly') {
		shelterMult = 4.3
	} else if (shelterFreq === 'biweekly') {
		shelterMult = 2.15
	}
	let monthlyShelter = shelterCost * shelterMult;
	return monthlyShelter || 0;
}

const earnedDed = .20; //percent

module.exports.earnedICDed = (grossIC) => {
	let ded = grossIC * earnedDed;
	let result = grossIC - ded;
	return result || 0;
}

//max shelter ded is 517

module.exports.calcNet = (minusEID, std) => {
	return minusEID - std || 0;
}

module.exports.shelterDed = (adjIncome, shelter, sua) => {
	let shelterSum = shelter + sua;
	let shelterDed = shelterSum - (adjIncome / 2)
		if (shelterDed > 517) {
			shelterDed = 517;
		} else if (shelterDed < 0) {
			shelterDed = 0;
		}
	return shelterDed || 0;
}

module.exports.getNet = (adjIncome, shelterDed) => {
	return adjIncome - shelterDed || 0;
}

module.exports.oneThirdCalc = (netIncome) => {
	let benefit = netIncome * .3
	return Math.ceil(benefit) || 0
}
