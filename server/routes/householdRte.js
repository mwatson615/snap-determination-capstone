'use strict';
const { Router } = require('express');
const router = Router();
const { addHousehold, getAllHouseholds } = require('../controllers/householdCtrl.js');

router.get('/household', getAllHouseholds);
router.post('/household/new', addHousehold);

module.exports = router;
