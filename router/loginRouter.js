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
const pageTitle = "Login";

const { redirectLoginPage } = require("./../middleware/common/checkLogin");

// creating router
const router = express.Router();

// get login page
router.get("/", decorateHtml(pageTitle), redirectLoginPage, getLoginPage);

// get logged in
router.post(
  "/",
  decorateHtml(pageTitle),
  LoginValidation,
  loginValidationHandle,
  login
);

// logout
router.delete("/", logout);

// export
module.exports = router;
