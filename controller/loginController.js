// extarnal
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal
const User = require("../models/User");

// get Login page
const getLoginPage = (req, res) => {
  res.render("login");
};

// do login
async function login(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPass = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPass) {
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
        };

        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPRIRE,
        });

        // ser cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPRIRE,
          httpOnly: true,
          signed: true,
        });

        // set user locals user
        res.locals.loggedUser = userObject;
        res.redirect("/");
      } else {
        throw createError("login Failed! Please try again!");
      }
    } else {
      throw createError("login Failed! Please try again!");
    }
  } catch (err) {
    res.render("login", {
      data: {
        username: req.body.username,
      },
      error: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// do logout
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged Out");
}

// export
module.exports = { getLoginPage, login, logout };
