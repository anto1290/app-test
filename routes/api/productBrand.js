const express = require("express");
const router = express.Router();
const productBrandController = require('../../controller/productBrand')

router.get('/', productBrandController.index)



module.exports = router;
