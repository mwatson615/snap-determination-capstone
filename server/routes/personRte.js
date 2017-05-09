'use strict';
const { Router } = require('express');
const router = Router();
const { addPerson, getAllPersons, getPersonsByZip } = require('../controllers/personCtrl.js');

router.get('/person', getAllPersons);
router.post('/person/new', addPerson);
// router.get('/person/zip', getPersonsByZip)

module.exports = router;
