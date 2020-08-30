const db = require('../../config/db');

module.exports = {
    create(post_comment, post_id){
        const query = `INSERT INTO posts_comments
        (
            name,
            email,
            body,
            post_id
        )
        VALUES
        ( ?, ?, ?, ? )`;

        const values = [
            post_comment.name,
            post_comment.email,
            post_comment.body,
            post_id
        ];

        return db.promise().query(query, values);
    },
    all(post_id){
        return db.promise().query(`SELECT * FROM posts_comments WHERE post_id = ${post_id}`);
    }
}