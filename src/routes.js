const express = require('express');
const routes = express.Router();

const SiteController = require('./app/controllers/SiteController');
const PostController = require('./app/controllers/PostController');

routes.get('/', SiteController.index);

//POSTS
routes.post('/posts', PostController.post);
routes.get('/posts', PostController.index);

module.exports = routes;