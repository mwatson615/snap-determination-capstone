'use strict';
const { Router } = require('express');
const router = Router();
const { addPerson, getAllPersons, addResource, addIncome } = require('../controllers/personCtrl.js');
router.get('/person', getAllPersons);
router.post('/person/new', addPerson);
router.patch('/person/addResource', addResource);
router.patch('/person/addIncome', addIncome);
// console.log(addIncome, "addIncome")

module.exports = router;
