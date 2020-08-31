const db = require('../../config/db');

module.exports = {
    create(post) {
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
    findLastInsert() {
        return db.promise().query('SELECT * FROM posts ORDER BY id DESC LIMIT 1');
    },
    findById(id) {
        return db.promise().query(`SELECT * FROM posts WHERE id = ${id}`);
    },
    all() {
        return db.promise().query('SELECT * FROM posts');
    },
    findRecents() {
        return db.promise().query('SELECT * FROM posts ORDER BY created_at DESC LIMIT 9');
    },
    update(post) {
        const query = `UPDATE posts SET
        title = ?,
        subtitle = ?,
        subject = ?,
        image = ?,
        body = ?
        WHERE
        id = ?`;

        const values = [
            post.title,
            post.subtitle,
            post.subject,
            post.image,
            post.body,
            post.id
        ];

        return db.promise().query(query, values);
    },
    destroy(post_id){
        return db.promise().query(`DELETE FROM posts WHERE id = ${post_id}`);
    },
    search(params){
        const { filter, category } = params;
        let query = '';

        if(category){
            query = `SELECT * FROM posts WHERE subject LIKE '${category}'`;
        }else{
            query = `SELECT * FROM posts WHERE title LIKE '%${filter}%'
            OR subtitle LIKE '%${filter}%' OR subject LIKE '%${filter}%' 
            OR body LIKE '%${filter}%'`;
        }

        return db.promise().query(query);
    },
    getPostsSubjects(){
        return db.promise().query('SELECT subject FROM posts GROUP BY subject');
    }
}