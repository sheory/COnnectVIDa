const db = require('../../config/db');

module.exports = {
    create(message){
        const query = `INSERT INTO messages
        (
            name,
            email,
            body
        )
        VALUES
        ( ?, ?, ? )`;

        const values = [
            message.name,
            message.email,
            message.body
        ];

        return db.promise().query(query, values);
    }
}