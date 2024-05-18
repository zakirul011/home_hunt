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

// creating router
const router = express.Router();

// page title
const pageTitle = "Signup";

// get signup page
router.get("/", decorateHtml(pageTitle), getSignupPage);

router.post(
  "/",
  decorateHtml(pageTitle),
  avaterUploader,
  userValidator,
  userValidatorHandle,
  storeUser
);

// export
module.exports = router;
