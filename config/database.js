const mysql = require('mysql');



const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dev_test114'
})

module.exports = conn;
