// external
const express = require("express");

// internal
const {
  getLoginPage,
  login,
  logout,
} = require("./../controller/loginController");
const decorateHtml = require("./../middleware/common/decorateHtml");
const {
  LoginValidation,
  loginValidationHandle,
} = require("./../middleware/login/loginValidators");
const page_title = "Login";

const { redirectLoginPage } = require("./../middleware/common/checkLogin");

// creating router
const router = express.Router();

// get login page
router.get("/", decorateHtml(page_title), redirectLoginPage, getLoginPage);

// get logged in
router.post(
  "/",
  decorateHtml(page_title),
  LoginValidation,
  loginValidationHandle,
  login
);

// logout
router.delete("/", logout);

// export
module.exports = router;
