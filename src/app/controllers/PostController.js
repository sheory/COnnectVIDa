const Post = require('../models/Post');
const File = require('../models/File');
const PostComment = require('../models/PostComment');
const { date } = require('../../libs/utils');

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

            let results = await Post.findLastInsert();
            const post = results[0][0];

            const filesPromise = req.body.files.map(file => File.create(file, post.id));

            await Promise.all(filesPromise);

            let video;
            const images = [];
            let audio;

            results = await File.all(post.id);

            for (let i = 0; i < results[0].length; i++) {
                if (results[0][i].type === 'image') {
                    images.push(results[0][i]);
                } else if (results[0][i].type === 'video') {
                    video = results[0][i];
                } else if (results[0][i].type === 'audio') {
                    audio = results[0][i];
                }
            }

            return res.json({ post, video, images, audio });

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

            let video;
            const images = [];
            let audio;

            results = await File.all(post.id);

            for (let i = 0; i < results[0].length; i++) {
                if (results[0][i].type === 'image') {
                    images.push(results[0][i]);
                } else if (results[0][i].type === 'video') {
                    video = results[0][i];
                } else if (results[0][i].type === 'audio') {
                    audio = results[0][i];
                }
            }

            let datetime = new Date(post.created_at);
            let convert = date(datetime.getTime());
            post.created_at = `${convert.format} às ${convert.hourFormat}`;

            datetime = new Date(post.updated_at);
            convert = date(datetime.getTime());
            post.updated_at = `${convert.format} às ${convert.hourFormat}`;

            results = await PostComment.all(post.id);

            const comments = results[0];

            for (let i = 0; i < comments.length; i++) {
                let datetime = new Date(comments[i].created_at);
                let convert = date(datetime.getTime());
                comments[i].created_at = `${convert.format} às ${convert.hourFormat}`;
    
                datetime = new Date(comments[i].updated_at);
                convert = date(datetime.getTime());
                comments[i].updated_at = `${convert.format} às ${convert.hourFormat}`;
            }

            return res.render('postagens/post', { post, video, images, audio, comments });
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
