const mysql = require('mysql');



const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '49155',
  password: 'root',
  database: 'dev_test114'
})

module.exports = conn;
