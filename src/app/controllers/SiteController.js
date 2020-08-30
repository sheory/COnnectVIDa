const Post = require('../models/Post');
const { date } = require('../../libs/utils');
const firebase = require('../../config/firebase');


module.exports = {
    async index(req, res) {
        let results = await Post.findRecents();
        const posts = results[0];

        for (let i = 0; i < posts.length; i++) {
            let datetime = new Date(posts[i].created_at);
            let convert = date(datetime.getTime());
            posts[i].created_at = `${convert.format} às ${convert.hourFormat}`;

            datetime = new Date(posts[i].updated_at);
            convert = date(datetime.getTime());
            posts[i].updated_at = `${convert.format} às ${convert.hourFormat}`;
        }

        results = await Post.getPostsSubjects();
        const subjects = results[0];
        
       return res.render('main/index', { posts, subjects });
    },
    async category(req, res) {
        const category = req.query.category_name;
        const params = {};

        params.category = category;

        let results = await Post.search(params);
        const posts = results[0];

        for (let i = 0; i < results[0].length; i++) {
            let datetime = new Date(results[0][i].created_at);
            let convert = date(datetime.getTime());
            results[0][i].created_at = `${convert.format} às ${convert.hourFormat}`;

            datetime = new Date(results[0][i].updated_at);
            convert = date(datetime.getTime());
            results[0][i].updated_at = `${convert.format} às ${convert.hourFormat}`;
        }

        results = await Post.getPostsSubjects();
        const subjects = results[0];

         return res.render('temas/temas', { posts, subjects });

    },
    about(req, res){

        return res.render('sobre/sobre');
    }
}
