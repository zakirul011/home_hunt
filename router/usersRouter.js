// external
const express = require("express");

// internal
const { getUsersPage, removeUser } = require("./../controller/usersController");
const decorateHtml = require("./../middleware/common/decorateHtml");
const {
  checkLogin,
  requiredRole,
} = require("./../middleware/common/checkLogin");

// creating router
const router = express.Router();

// page title
const pageTitle = "Users";

// get users page
router.get("/", decorateHtml(pageTitle), checkLogin, getUsersPage);

// delete the user
router.delete("/:id", checkLogin, requiredRole(["admin"]), removeUser);

// export
module.exports = router;
