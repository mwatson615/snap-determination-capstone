'use strict';

const express = require('express');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const { Router } = require('express');
const router = Router();

const routes = require('./routes/router.js')

const app = express();
const PORT = process.env.PORT || 3000

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/snapdb'

app.use(json());

mongoose.Promise = Promise;

app.use('/api/v1/', routes)

mongoose.connect(MONGODB_URL)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`)
		})
	})
	.catch(console.error)

module.exports = app;
