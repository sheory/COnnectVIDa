const Post = require('../models/Post');

module.exports = {
    async index(req, res) {
        try {
            const results = await Post.all();

            const posts = results[0];

            return res.json({ posts });
        } catch (error) {
            return res.send("Algo deu errado!");
        }
    },
    async post(req, res) {
        try {
            const keys = Object.keys(req.body);

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.send("Preencha todos os campos!");
                }
            }

            await Post.create(req.body);

            const results = await Post.findLastInsert();
            const post = results[0][0];

            return res.json({ post });
        } catch (error) {
            return res.send("Algo deu errado!");
        }
    },
    async put(req, res) {
        try {
            const keys = Object.keys(req.body);

            let results = await Post.findById(req.body.id);

            if (!results[0].length > 0) {
                return res.send("Post não encontrado!");
            }

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.send("Preencha todos os campos!");
                }
            }

            await Post.update(req.body);

            results = await Post.findById(req.body.id);
            const post = results[0][0];

            return res.json({ post });
        } catch (error) {
            res.send('Algo deu errado!');
        }
    },
    async show(req, res) {
        try {
            let results = await Post.findById(req.params.id);

            if (!results[0].length > 0) {
                return res.send("Post não encontrado!");
            }

            results = await Post.findById(req.params.id);
            const post = results[0][0];

            return res.json({ post });
        } catch (error) {
            res.send('Algo deu errado!');
        }
    },
    async delete(req, res) {
        try {
            await Post.destroy(req.params.id);
            res.send(`Post ${req.params.id} excluido!`);
        } catch (error) {
            res.send('Algo deu errado!');
        }
    }
}