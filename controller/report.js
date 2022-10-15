
const conn = require('../config/database');



const index = (req, res) => {
  const { area = [], startDate = '', endDate = '' } = req.query;
  if (!area.length && startDate === '' && endDate === '') {
    console.log('hallo 1')
    conn.query({
      sql: 'SELECT RP.compliance,RP.tanggal,S.store_name,P.product_name,PB.brand_name,SA.area_name,SAC.account_name FROM report_product AS RP INNER JOIN store as s ON RP.store_id = S.store_id INNER JOIN product as P ON RP.product_id = P.product_id INNER JOIN product_brand as PB ON P.brand_id = PB.brand_id INNER JOIN store_area as SA ON S.area_id = SA.area_id INNER JOIN store_account as SAC ON S.account_id = SAC.account_id'
    }, function (error, results, fields) {
      if (error) throw error;
      res.json(results)
    })

  }
  if (area.length && startDate === '' && endDate === '') {
    console.log('hallo 2')
    const split = area.split(',');
    const join = split.join("','");
    conn.query({
      sql: `SELECT RP.compliance,RP.tanggal,S.store_name,P.product_name,PB.brand_name,SA.area_name,SAC.account_name FROM report_product AS RP INNER JOIN store as s ON RP.store_id = S.store_id INNER JOIN product as P ON RP.product_id = P.product_id INNER JOIN product_brand as PB ON P.brand_id = PB.brand_id INNER JOIN store_area as SA ON S.area_id = SA.area_id INNER JOIN store_account as SAC ON S.account_id = SAC.account_id WHERE SA.area_name IN ('${join}')`
    }, function (error, results, fields) {
      if (error) throw error;
      res.json(results)
    })
  }
  if (area.length && endDate === '') {
    console.log('hallo 3')
    const split = area.split(',');
    const join = split.join("','");
    conn.query({
      sql: `SELECT RP.compliance,RP.tanggal,S.store_name,P.product_name,PB.brand_name,SA.area_name,SAC.account_name FROM report_product AS RP INNER JOIN store as s ON RP.store_id = S.store_id INNER JOIN product as P ON RP.product_id = P.product_id INNER JOIN product_brand as PB ON P.brand_id = PB.brand_id INNER JOIN store_area as SA ON S.area_id = SA.area_id INNER JOIN store_account as SAC ON S.account_id = SAC.account_id WHERE SA.area_name IN ('${join}') AND RP.tanggal >= ${startDate}`
    }, function (error, results, fields) {
      if (error) throw error;
      res.json(results)
    })
  }
  if (!area.length && startDate && endDate) {
    console.log('hallo 4')
    conn.query({
      sql: `SELECT RP.compliance,RP.tanggal,S.store_name,P.product_name,PB.brand_name,SA.area_name,SAC.account_name FROM report_product AS RP INNER JOIN store as s ON RP.store_id = S.store_id INNER JOIN product as P ON RP.product_id = P.product_id INNER JOIN product_brand as PB ON P.brand_id = PB.brand_id INNER JOIN store_area as SA ON S.area_id = SA.area_id INNER JOIN store_account as SAC ON S.account_id = SAC.account_id WHERE  RP.tanggal BETWEEN date('${startDate}') AND date('${endDate}')`
    }, function (error, results, fields) {
      if (error) throw error;
      res.json(results)
    })
  } else if (area.length && startDate && endDate) {
    console.log('hallo 5')
    const split = area.split(',');
    const join = split.join("','");
    conn.query({
      sql: `SELECT RP.compliance,RP.tanggal,S.store_name,P.product_name,PB.brand_name,SA.area_name,SAC.account_name FROM report_product AS RP INNER JOIN store as s ON RP.store_id = S.store_id INNER JOIN product as P ON RP.product_id = P.product_id INNER JOIN product_brand as PB ON P.brand_id = PB.brand_id INNER JOIN store_area as SA ON S.area_id = SA.area_id INNER JOIN store_account as SAC ON S.account_id = SAC.account_id WHERE SA.area_name IN ('${join}') AND RP.tanggal BETWEEN date('${startDate}') AND date('${endDate}') `
    }, function (error, results, fields) {
      if (error) throw error;
      res.json(results)
    })
  }

}


module.exports = {
  index
}
