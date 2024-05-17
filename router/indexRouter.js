// external
const express = require("express");

// internal
const { getIndexPage } = require("./../controller/indexController");
const decorateHtml = require("./../middleware/common/decorateHtml");
const { checkLogin } = require("./../middleware/common/checkLogin");

// creating router
const router = express.Router();

// get index page
router.get("/", decorateHtml("Home"), checkLogin, getIndexPage);

// export
module.exports = router;
