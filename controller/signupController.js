const User = require("../models/User");
const bcrypt = require("bcrypt");

const getSignupPage = (req, res) => {
  res.render("signup");
};

// store the user to database
const storeUser = async (req, res) => {
  let newUser;
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avater: req.files[0].filename,
      password: hashPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashPassword,
    });
  }

  newUser
    .save()
    .then(() => {
      res.redirect("users");
    })
    .catch((err) => {
      res.render("error", {
        error: err,
      });
    });
};

// export
module.exports = { getSignupPage, storeUser };
