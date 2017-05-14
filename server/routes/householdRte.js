'use strict';
const { Router } = require('express');
const router = Router();
const { addHousehold, getAllHouseholds, getHouseholdZip, addShelter, getHouseholdById, getHouseholdByPerson, getHouseholdResults } = require('../controllers/householdCtrl.js');

router.get('/household', getAllHouseholds);
router.post('/household/new', addHousehold); //HH id and zip code
router.patch('/household/addShelter', addShelter);
router.get('/household/:id', getHouseholdById);
router.get('/household/:zip', getHouseholdZip)
router.get('/household/person/:id', getHouseholdByPerson)
router.get('/household/results/:id', getHouseholdResults)

module.exports = router;
