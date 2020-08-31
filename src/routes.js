const express = require('express');
const routes = express.Router();

const SiteController = require('./app/controllers/SiteController');
const PostController = require('./app/controllers/PostController');
const PostCommentController = require('./app/controllers/PostCommentsController');



//POSTS
routes.post('/posts', PostController.post);
routes.get('/posts', PostController.index);
routes.get('/posts/:id', PostController.show);
routes.put('/posts', PostController.put);
routes.delete('/posts/:id', PostController.delete);

//SITE
routes.get('/', SiteController.index);
routes.get('/temas', SiteController.category);
routes.get('/sobre', SiteController.about);
routes.get('/contato', SiteController.contact);
routes.post('/busca', SiteController.search);

//POSTS COMMENTS
routes.post('/postcomment/:postId', PostCommentController.post);

module.exports = routes;