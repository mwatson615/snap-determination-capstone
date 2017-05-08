'use strict';

const express = require('express');
const { json } = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000

app.use(json());

mongoose.Promise = Promise;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})

module.exports = app;
