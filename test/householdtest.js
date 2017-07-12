'use strict';

process.env.NODE_ENV = "test";

// let mongoose = require("mongoose");
// let Household = require("./models/householdMdl");

const chai = require('chai');
const should = chai.Should();
const expect = require('chai').expect;
const assert = require('chai').assert;


const { resourceTest, grossTest, netTest } = require('../server/controllers/testCtrl');

describe('resourceTest', function () {
	let resourceLimit = 2250;
	let underResource = 2250;
	let overResource = 2251;
	it('should detect resources under resource limit', function () {
		expect(resourceTest(underResource)).to.equal(true);
		expect(resourceTest(overResource)).to.equal(false);
	})
	it('should detect resources over resource limit', function () {
		expect(resourceTest(overResource)).to.equal(false);
	})
})
