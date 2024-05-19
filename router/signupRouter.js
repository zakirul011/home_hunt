// external
const express = require("express");

// internal
const {
  getSignupPage,
  storeUser,
} = require("./../controller/signupController");
const decorateHtml = require("./../middleware/common/decorateHtml");
const avaterUploader = require("./../middleware/user/avaterUploader");
const {
  userValidator,
  userValidatorHandle,
} = require("./../middleware/user/userValidator");
const {
  checkLogin,
  requiredRole,
} = require("./../middleware/common/checkLogin");

// creating router
const router = express.Router();

// page title
const pageTitle = "Signup";

// get signup page
router.get(
  "/",
  decorateHtml(pageTitle),
  checkLogin,
  requiredRole(["admin"]),
  getSignupPage
);

router.post(
  "/",
  decorateHtml(pageTitle),
  checkLogin,
  requiredRole(["admin"]),
  avaterUploader,
  userValidator,
  userValidatorHandle,
  storeUser
);

// export
module.exports = router;
