const PostComment = require('../models/PostComment');
module.exports = {
    async post(req, res){
        const post_id = req.params.postId;

        const post_comment = req.body;

        await PostComment.create(post_comment, post_id);

        return res.redirect(`/posts/${post_id}`);
    }
}