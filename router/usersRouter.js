// external
const express = require("express");

// internal
const { getUsersPage, removeUser } = require("./../controller/usersController");
const decorateHtml = require("./../middleware/common/decorateHtml");
const { checkLogin } = require("./../middleware/common/checkLogin");

// creating router
const router = express.Router();

// get users page
router.get("/", decorateHtml("Users"), checkLogin, getUsersPage);

// delete the user
router.delete("/:id", removeUser);

// export
module.exports = router;