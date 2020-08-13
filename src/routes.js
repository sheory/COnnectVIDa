const express = require('express');
const routes = express.Router();

const SiteController = require('./app/controllers/SiteController');
const PostController = require('./app/controllers/PostController');



//POSTS
routes.post('/posts', PostController.post);
routes.get('/posts', PostController.index);
routes.get('/posts/:id', PostController.show);
routes.put('/posts', PostController.put);
routes.delete('/posts/:id', PostController.delete);

//SITE
routes.get('/', SiteController.index);
routes.get('/temas', SiteController.category);

module.exports = routes;