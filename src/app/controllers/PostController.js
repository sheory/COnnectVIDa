const Post = require('../models/Post');

module.exports = {
    async index(req, res){
        const results = await Post.all();

        const posts = results[0];

        return res.json({ posts });
    },
    async post(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!");
            }
        }

        await Post.create(req.body);

        const results = await Post.findLastInsert();
        const post = results[0][0];

        return res.json({ post });
    }
}