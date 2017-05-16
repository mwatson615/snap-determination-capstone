'use strict'

const resourceLimit = 2250;

let resourceEligible = false;

module.exports.getArraySum = (moneyArray) => {
	let sum = moneyArray.reduce(function(acc, val) {
		return acc + val;
		}, 0);
	return sum;
	}


module.exports.resourceTest = (resourceSum) => {
	if (resourceSum <= resourceLimit) {
		resourceEligible = true;
		return resourceEligible;
	}
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
//1287
const grossLimit = [1287, 1736, 2184, 2633, 3081, 3530, 3980,4430]
//each additional is 451

module.exports.grossTest = (householdSize, grossIncome) => {
	let grossEligible = false;
	console.log(grossIncome, "gross check")
	for (let i = 1; i <= 8; i++)
		if (householdSize === i && grossIncome <= grossLimit[i-1]) {
		grossEligible = true
		}
	return grossEligible;
	}

const earnedDed = .20; //percent

module.exports.earnedICDed = (grossIC) => {
	let ded = grossIC * earnedDed;
	let result = grossIC - ded;
	return result;
}

const standardDed13 = 157,
standardDed4 = 168,
standardDed5 = 197,
standardDed6 = 226

module.exports.getStd = (householdSize) => {
	let usedStd = '';
	switch(householdSize) {
		case 1:
		case 2:
		case 3:
			usedStd = standardDed13;
			break;
		case 4:
			usedStd = standardDed4;
			break;
		case 5:
			usedStd = standardDed5;
			break;
		case 6:
			usedStd = standardDed6;
			break;
	}
	return usedStd;
}

const sua1 = 308,
sua2 = 319,
sua3 = 331,
sua4 = 343,
sua5 = 353,
sua6 = 365,
sua7 = 375

//max shelter ded is 517

module.exports.calcNet = (minusEID, std) => {
	return minusEID - std;
}

module.exports.getSua = (householdSize, paysSUA) => {
	if (paysSUA === true) {
	let usedSua = '';
	switch(householdSize) {
		case 1:
			usedSua = sua1;
			break;
		case 2:
			usedSua = sua2;
			break;
		case 3:
			usedSua = sua3;
			break;
		case 4:
			usedSua = sua4;
			break;
		case 5:
			usedSua = sua5;
			break;
		case 6:
			usedSua = sua6;
			break;
		case (householdSize >= 7):
			usedSua = sua7
			break;
	}
	return usedSua;
	}
}

module.exports.shelterDed = (adjIncome, shelter, sua) => {
	let shelterSum = shelter + sua;
	let shelterDed = shelterSum - (adjIncome / 2)
		if (shelterDed > 517) {
			shelterDed = 517;
		}
	return shelterDed;
}

module.exports.getNet = (adjIncome, shelterDed) => {
	return adjIncome - shelterDed;
}

const netLimit = [990, 1335, 1680, 2025, 2370, 2715, 3061, 3408];
// each additional is 347

module.exports.netTest = (householdSize, netIncome) => {
	let netEligible = false;
	console.log(netIncome, "net check")
	for (let i = 1; i <= 8; i++)
		if (householdSize === i && netIncome <= netLimit[i-1]) {
		netEligible = true
		}
	return netEligible;
	}

module.exports.oneThirdCalc = (netIncome) => {
	let benefit = netIncome * .3
	return Math.ceil(benefit)
}

// max benefit amount
const max1 = 194,
max2 = 357,
max3 = 511,
max4 = 649,
max5 = 771,
max6 = 925,
max7 = 1022,
max8 = 1169

//half of adjustedIC = 450.7

module.exports.getFinalBenefit = (householdSize, netIncome) => {
	let finalBenefit = '';
	switch(householdSize) {
		case 1:
			finalBenefit = max1 - netIncome;
			break;
		case 2:
			finalBenefit = max2 - netIncome;
			break;
		case 3:
			finalBenefit = max3 - netIncome;
			break;
		case 4:
			finalBenefit = max4 - netIncome;
			break;
		case 5:
			finalBenefit = max5 - netIncome;
			break;
		case 6:
			finalBenefit = max6 - netIncome;
			break;
		case 7:
			finalBenefit = max7 - netIncome;
			break;
		case 8:
			finalBenefit = max8 - netIncome;
			break;
	}
	return finalBenefit;
}
