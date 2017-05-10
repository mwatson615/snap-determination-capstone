'use strict';
const { Router } = require('express');
const router = Router();
const { addHousehold, getAllHouseholds, getHouseholdZip, addShelter, getSummary } = require('../controllers/householdCtrl.js');

router.get('/household', getAllHouseholds);
router.post('/household/new', addHousehold); //HH id and zip code
router.patch('/household/addShelter', addShelter);
router.get('/household/summary', getSummary);
router.get('/household/:zip', getHouseholdZip)
// router.patch('/household/addMembers', addMembers) //step 2, pops pplarray and #

module.exports = router;
