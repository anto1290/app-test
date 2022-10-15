
const conn = require('../config/database');



const index = (req, res) => {
  const { area = [], startDate = '', endDate = '' } = req.query;
  if (!area.length && startDate === '' && endDate === '') {
    conn.query({
      sql: 'SELECT RP.compliance,RP.tanggal,S.store_name,P.product_name,PB.brand_name,SA.area_name,SAC.account_name FROM report_product AS RP INNER JOIN store as S ON RP.store_id = S.store_id INNER JOIN product as P ON RP.product_id = P.product_id INNER JOIN product_brand as PB ON P.brand_id = PB.brand_id INNER JOIN store_area as SA ON S.area_id = SA.area_id INNER JOIN store_account as SAC ON S.account_id = SAC.account_id'
    }, function (error, results, fields) {
      if (error) throw error;
      res.json(results)
    })

  }
  if (area.length && startDate === '' && endDate === '') {
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
    conn.query({
      sql: `SELECT RP.compliance,RP.tanggal,S.store_name,P.product_name,PB.brand_name,SA.area_name,SAC.account_name FROM report_product AS RP INNER JOIN store as s ON RP.store_id = S.store_id INNER JOIN product as P ON RP.product_id = P.product_id INNER JOIN product_brand as PB ON P.brand_id = PB.brand_id INNER JOIN store_area as SA ON S.area_id = SA.area_id INNER JOIN store_account as SAC ON S.account_id = SAC.account_id WHERE  RP.tanggal BETWEEN date('${startDate}') AND date('${endDate}')`
    }, function (error, results, fields) {
      if (error) throw error;
      res.json(results)
    })
  } else if (area.length && startDate && endDate) {
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

const getIndex = async (req, res) => {
  const { area, brand } = req.query;
  try {
    conn.query({
      sql: `SELECT sum(RP.compliance) as jml ,PB.brand_name,SA.area_name FROM report_product AS RP INNER JOIN store as S ON RP.store_id = S.store_id INNER JOIN product as P ON RP.product_id = P.product_id INNER JOIN product_brand as PB ON P.brand_id = PB.brand_id INNER JOIN store_area as SA ON S.area_id = SA.area_id INNER JOIN store_account as SAC ON S.account_id = SAC.account_id WHERE SA.area_name='${area}' AND PB.brand_name='${brand}';
  `
    }, function (error, results, fields) {
      if (error) throw error;
      res.json(results)
    })

  } catch (error) {
    res.json(error)
  }
}

module.exports = {
  index,
  getIndex
}
