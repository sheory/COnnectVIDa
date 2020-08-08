const express = require('express');
const routes = express.Router();

const SiteController = require('./app/controllers/SiteController');

routes.get('/', SiteController.index);

module.exports = routes;