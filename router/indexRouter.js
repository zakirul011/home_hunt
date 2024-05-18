// external
const express = require("express");

// internal
const { getIndexPage, searching } = require("./../controller/indexController");
const decorateHtml = require("./../middleware/common/decorateHtml");
const { checkLogin } = require("./../middleware/common/checkLogin");

// creating router
const router = express.Router();

// page title
const pageTitle = "Home";

// get index page
router.get("/", decorateHtml(pageTitle), checkLogin, getIndexPage);

//search area
router.get("/search", decorateHtml(pageTitle), checkLogin, searching);

// export
module.exports = router;
