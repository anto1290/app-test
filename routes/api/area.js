const express = require("express");
const router = express.Router();
const areaController = require('../../controller/area')

router.get('/', areaController.index)



module.exports = router;
