'use strict';

process.env.NODE_ENV = "test";

const chai = require('chai');
const should = chai.Should();
const expect = require('chai').expect;
const assert = require('chai').assert;


const { resourceTest, grossTest, netTest } = require('../server/controllers/testCtrl');

describe('resourceTest', () => {
	let underResource = 2250;
	let overResource = 2251;
	it('should detect resources under resource limit', function () {
		expect(resourceTest(underResource)).to.equal(true);
	})
	it('should detect resources over resource limit', function () {
		expect(resourceTest(overResource)).to.equal(false);
	})
})

function netLoop(val) {
describe('netTest', () => {
	const netLimit = [990, 1335, 1680, 2025, 2370, 2715, 3061, 3408];
	let householdSize = [1, 2, 3, 4, 5, 6, 7, 8];
	const overNetLimit = [991, 1336, 1681, 2026, 2371, 2716, 3062, 3409];
	it('should detect net eligibility based on hh size and net income', () => {
		expect(netTest(householdSize[val], netLimit[val])).to.equal(true);
	})
	it('should detect over net income for hh size', () => {
		expect(netTest(householdSize[val], overNetLimit[val])).to.equal(false);
	})
})
}

for (var i = 1; i < 8; i++) {
	netLoop(i-1)
}

function grossLoop(val) {
describe('grossTest', () => {
	const grossLimit = [1287, 1736, 2184, 2633, 3081, 3530, 3980, 4430];
	let householdSize = [1, 2, 3, 4, 5, 6, 7, 8];
	const overGrossLimit = [1288, 1737, 2185, 2634, 3082, 3531, 3981, 4431];
	it('should detect gross eligibility based on hh size and gross income', () => {
		expect(grossTest(householdSize[val], grossLimit[val])).to.equal(true);
	})
	it('should detect over gross income for hh size', () => {
		expect(grossTest(householdSize[val], overGrossLimit[val])).to.equal(false);
	})
})
}

for (var i = 1; i < 8; i++) {
	grossLoop(i-1)
}
