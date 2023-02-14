const express = require("express");
const { viewFile } = require("../../controller/viewFile/viewFile.controller");



const router = express.Router();


router.route("/view/:filename").get(viewFile);
module.exports = router;