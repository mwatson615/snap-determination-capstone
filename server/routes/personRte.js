'use strict';
const { Router } = require('express');
const router = Router();
const { addPerson, getAllPersons, addResource, addIncome } = require('../controllers/personCtrl.js');
router.get('/person', getAllPersons);
router.post('/person/new', addPerson);
console.log(addIncome)
router.patch('/person/addResource', addResource);
router.patch('/person/addIncome', addIncome);

module.exports = router;
