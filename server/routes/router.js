const { Router } = require('express');
const router = Router();
const { json } = require('body-parser');

router.use(require('./householdRte'))

router.get('/', (req, res, next) => {
	res.json("hi there")
})

module.exports = router;
