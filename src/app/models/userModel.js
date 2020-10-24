const db = require('./mysql');

module.exports = {
  async findByEmail(email) {
    return db.promise().query(`SELECT * FROM users WHERE email = '${email}'`);
  }
}
