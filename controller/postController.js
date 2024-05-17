const Post = require("./../models/Post");
const { unlink } = require("fs");
const path = require("path");

// getPost
const getPost = (req, res) => {
  res.render("post");
};

// addPost
const addPost = (req, res) => {
  let newPost;

  if (req.files && req.files.length > 0) {
    newPost = new Post({
      ...req.body,
      file: req.files[0].filename,
    });
  } else {
    newPost = new Post(req.body);
  }

  newPost
    .save()
    .then(() => {
      console.log("post added successfully");
      res.redirect("/");
    })
    .catch((err) => {
      res.locals.error = err;
      res.render("error", {
        title: "Error page",
      });
    });
};

// remove user
const removePost = (req, res, next) => {
  Post.findByIdAndDelete({
    _id: req.params.id,
  })
    .then((post) => {
      if (post.file) {
        unlink(
          path.join(__dirname, `/../public/uploads/post/${post.file}`),
          (err) => {
            if (err) {
              next(err);
            }
          }
        );

        res.status(200).json({
          message: "Post was removed succefully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          common: {
            message: "Could Not delete the Post!" + err,
          },
        },
      });
    });
};

module.exports = { getPost, addPost, removePost };

