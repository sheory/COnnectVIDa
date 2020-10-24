const User = require('./userModel');
const {compare} = require('bcryptjs');
const mysql = require('./mysql');

module.exports = {
  async login (req, res) {
    let results = await User.findByEmail(req.body.email)
    let password = await compare(req.body.password, results[0][0].password)
    console.log(results[0])

    if(results[0].length === 0 || password == false) {
      console.log("num ta certo");
    } else {
      console.log("it's working!");
    }
  }
}
