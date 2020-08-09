const Post = require('../models/Post');

module.exports = {
    async index(req, res){
        const results = await Post.findRecents();
        const posts = results[0];

        return res.render('index', { posts });
    }
}