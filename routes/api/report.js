const express = require("express");
const router = express.Router();
const reportController = require('../../controller/report')

router.get('/', reportController.index)



module.exports = router;
