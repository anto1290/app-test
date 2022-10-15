const conn = require('../config/database');

const index = (req, res) => {
  conn.query("SELECT * FROM store_area", function (error, results, fields) {
    if (error) throw error;
    res.json(results)
  })

}


module.exports = {
  index
}
