const conn = require('../config/database');


const index = (req, res) => {
  conn.query('SELECT * FROM product_brand', (err, result, fields) => {
    if (err) throw err;
    res.json(result)
  })
}

module.exports = { index }
