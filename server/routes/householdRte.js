'use strict';
const { Router } = require('express');
const router = Router();
const { addHousehold, getAllHouseholds, getHouseholdZip } = require('../controllers/householdCtrl.js');

router.get('/household', getAllHouseholds);
router.post('/household/new', addHousehold);
router.get('/household/:zip', getHouseholdZip)

module.exports = router;
