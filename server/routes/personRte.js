'use strict';
const { Router } = require('express');
const router = Router();
const { addPerson, getAllPersons } = require('../controllers/personCtrl.js');

router.get('/person', getAllPersons);
router.post('/person/new', addPerson);

module.exports = router;
