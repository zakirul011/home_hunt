const path = require("path");
const User = require("../models/User");
const { unlink } = require("fs");

const getUsersPage = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("users", {
        users,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// remove user
const removeUser = (req, res, next) => {
  User.findByIdAndDelete({
    _id: req.params.id,
  })
    .then((user) => {
      if (user.avater) {
        unlink(
          path.join(__dirname, `/../public/uploads/avaters/${user.avater}`),
          (err) => {
            if (err) {
              next(err);
            }
          }
        );

        res.status(200).json({
          message: "User was removed succefully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          common: {
            message: "Could Not delete the user!" + err,
          },
        },
      });
    });
};

// export
module.exports = { getUsersPage, removeUser };
