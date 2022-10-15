const express = require("express");
const router = express.Router();
const reportController = require('../../controller/report')

router.get('/', reportController.index);
router.get('/report', reportController.getIndex);

module.exports = router;
