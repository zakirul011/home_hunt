// external imports
const express = require("express");
const router = express.Router();
const multer = require("multer");

// internal Imports
const postUpload = require("./../middleware/post/postUpload");
const {
  getPost,
  addPost,
  removePost,
} = require("./../controller/postController");
const decorateHtml = require("./../middleware/common/decorateHtml");
const { checkLogin } = require("./../middleware/common/checkLogin");
const {
  postValidator,
  postValidatorHanlder,
} = require("./../middleware/post/postValidator");

// page title
const pageTitle = "Post Page";

// post page
router.get("/", decorateHtml(pageTitle), checkLogin, getPost);

// add post
router.post(
  "/",
  decorateHtml(pageTitle),
  checkLogin,
  postUpload,
  postValidator,
  postValidatorHanlder,
  addPost
);

// delete the Post
router.delete("/:id", removePost);

// export
module.exports = router;
