'use strict';

const express = require('express');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const { Router } = require('express');
const router = Router();
const auth = require('./auth')

const routes = require('./routes/router.js')

const app = express();

const PORT = process.env.PORT || 3000

const MONGODB_URL = process.env.MONGODB_URL || `mongodb://${auth.username}:${auth.password}@ds151141.mlab.com:51141/snaptest`

app.use(json());

mongoose.Promise = Promise;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST,HEAD, OPTIONS,PUT, DELETE, PATCH");
  next();
});

app.use('/api/v1/', routes)

mongoose.connect(MONGODB_URL)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`)
		})
	})
	.catch(console.error)

module.exports = app;
