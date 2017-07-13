'use strict';

process.env.NODE_ENV = "test";

const chai = require('chai');
const should = chai.Should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const { getStd, getSua, getFinalBenefit } = require('../server/controllers/logicCtrl');

function stdLoop(val) {
	const standardDed = [157, 157, 157, 168, 197, 226, 226, 226];
	let householdSize = [1, 2, 3, 4, 5, 6, 7, 8];
describe('getStd', () => {
	it('correctly determines standard deduction based on hh size', () => {
		assert.strictEqual(getStd(householdSize[val]), standardDed[val])
	})
})
}

for (var i = 0; i < 8; i++) {
	stdLoop(i)
}

function suaLoop(val) {
	const sua = [308, 319, 331, 343, 353, 365, 375, 375];
	const householdSize = [1, 2, 3, 4, 5, 6, 7, 8];
describe('getSua', () => {
	it('correctly determines standard deduction based on hh size', () => {
		assert.strictEqual(getSua(householdSize[val], true), sua[val])
		assert.strictEqual(getSua(householdSize[val], false), 0)
	})
})
}

for (var i = 0; i < 8; i++) {
	suaLoop(i)
}

function finalBenefitLoop(val) {
	const maxBenefit = [194, 357, 511, 649, 771, 925, 1022, 1169];
	const householdSize = [1, 2, 3, 4, 5, 6, 7, 8];
	const oneDollarIssuance = [193, 356, 510, 648, 770, 924, 1021, 1168];
describe('getFinalBenefit', () => {
	it('correctly determines standard deduction based on hh size', () => {
		assert.strictEqual(getFinalBenefit(householdSize[val], 0), maxBenefit[val])
		assert.strictEqual(getFinalBenefit(householdSize[val], maxBenefit[val]), 0)
		assert.strictEqual(getFinalBenefit(householdSize[val], oneDollarIssuance[val]), 1)
	})
})
}

for (var i = 0; i < 8; i++) {
	finalBenefitLoop(i)
}
