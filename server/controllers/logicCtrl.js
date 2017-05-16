'use strict'

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
		if (finalBenefit < 0) {
			finalBenefit = 0;
		}
	// if (finalBenefit > 0) {
	return finalBenefit;
	// } else {
	// 	return null;
	// }
}
