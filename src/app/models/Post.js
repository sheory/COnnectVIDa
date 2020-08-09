const db = require('../../config/db');

module.exports = {
    create(post){
        const query = `INSERT INTO posts 
        (
            title,
            subtitle,
            subject,
            image,
            body
        )
        VALUES
        ( ?, ?, ?, ?, ?)`;

        const values = [
            post.title,
            post.subtitle,
            post.subject,
            post.image,
            post.body
        ];

        return db.promise().query(query, values);
    },
    findLastInsert(){
        return db.promise().query('SELECT * FROM posts ORDER BY id DESC LIMIT 1');
    },
    findById(id){
        return db.promise().query(`SELECT * FROM posts WHERE id = ${id}`);
    },
    all(){
        return db.promise().query('SELECT * FROM posts');
    },
    findRecents(){
        return db.promise().query('SELECT * FROM posts LIMIT 9');
    }
}