'use strict';
const { Router } = require('express');
const router = Router();
const { addPerson, getAllPersons, addResource, addIncome, getPersonByHousehold } = require('../controllers/personCtrl.js');
router.get('/person', getAllPersons);
router.post('/person/new', addPerson);
router.patch('/person/addResource', addResource);
router.patch('/person/addIncome', addIncome);
router.get('/person/hh/:id', getPersonByHousehold)
// console.log(addIncome, "addIncome")

module.exports = router;
