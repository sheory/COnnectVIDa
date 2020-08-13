const Post = require('../models/Post');

module.exports = {
    async index(req, res){
        const results = await Post.findRecents();
        const posts = results[0];

        return res.render('index', { posts });
    },
    async category(req, res){
        const category = req.query.category_name;
        const params = {};

        params.category = category;

        const results = await Post.search(params);

        const posts = results[0];

        return res.json({ posts });

    }
}