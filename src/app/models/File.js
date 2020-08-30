const db = require('../../config/db');

module.exports= {
    all(post_id){
        return db.promise().query(`SELECT * FROM files WHERE post_id = ${post_id}`);
    },
    create(file, post_id){
        const query = `INSERT INTO files
        (
            alias,
            src,
            type,
            post_id
        )
        VALUES
        ( ?, ?, ?, ? )`;

        const values = [
            file.alias,
            file.src,
            file.type,
            post_id
        ];

        return db.promise().query(query, values);
    }
}