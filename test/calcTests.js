'use strict';

process.env.NODE_ENV = "test";

const chai = require('chai');
const should = chai.Should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const { getArraySum, convertHousing, earnedICDed, calcNet, shelterDed, getNet, oneThirdCalc } = require('../server/controllers/calcCtrl')

describe('getArraySum', () => {
	it('should return the sum of an array', () => {
		assert.strictEqual(getArraySum([1, 2, 3]), 6)
	})
})

describe('convertHousing', () => {
	it('correctly determines multiplier based on pay frequency', () => {
		assert.strictEqual(convertHousing('weekly', 100), 430, "weekly")
		assert.strictEqual(convertHousing('biweekly', 100), 215, "biweekly")
		assert.strictEqual(convertHousing('monthly', 100), 100, "monthly")
	})
})

describe('earnedICDed', () => {
	it('correctly determines result of 20% earned income deduction', () => {
		assert.strictEqual(earnedICDed(1000), 800, "has earned income")
		assert.strictEqual(earnedICDed(0), 0, "no earned income")
	})
})

describe('calcNet', () => {
	it('calculates adjusted gross income after earned IC deduction and applies standard deduction', () => {
		assert.strictEqual(calcNet(1000, 157), 843)
	})
})

describe('shelterDed', () => {
	it('calculates shelter deduction based on adjusted income, shelter expenses, and standard utility allotment', () => {
		assert.strictEqual(shelterDed(1500, 1000, 308), 517)
		assert.strictEqual(shelterDed(0, 500, 365), 517)
		assert.strictEqual(shelterDed(0, 0, 0), 0)
	})
})

describe('getNet', () => {
	it('calculates the correct net income based on adjusted income and shelter deduction', () => {
		assert.strictEqual(getNet(1000, 517), 483)
		assert.strictEqual(getNet(0, 0), 0)
	})
})

describe('oneThirdCalc', () => {
	it('returns 30% of net income and rounds up', () => {
		assert.strictEqual(oneThirdCalc(1000), 300)
		assert.strictEqual(oneThirdCalc(0), 0)
	})
})
