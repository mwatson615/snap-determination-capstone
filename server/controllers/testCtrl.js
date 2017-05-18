'use strict';

const resourceLimit = 2250;

module.exports.resourceTest = (resourceSum) => {
	let resourceEligible = false;
	// console.log(resourceSum, "resource test sum")
	if (resourceSum <= resourceLimit) {
		resourceEligible = true;
	}
		return resourceEligible;
}

//1287
const grossLimit = [1287, 1736, 2184, 2633, 3081, 3530, 3980, 4430]
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
