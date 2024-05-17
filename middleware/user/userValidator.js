const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const createError = require("http-errors");
const { unlink } = require("fs");
const path = require("path");

const userValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required!")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name can not be anything other than Alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address!")
    .trim()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      try {
        if (user) {
          throw createError("Email is already used!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD")
    .withMessage("Mobile Number must be Bangladeshi mobile number")
    .custom(async (value) => {
      const user = await User.findOne({ mobile: value });
      try {
        if (user) {
          throw createError("Mobile Number is already used!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must have 8 characters long and should have 1 uppercase, lowercase, number & symble"
    ),
];

const userValidatorHandle = (req, res, next) => {
  const error = validationResult(req);
  const mappedError = error.mapped();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    // remove file
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../../public/uploads/avaters/${filename}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    // send the response
    if (res.locals.html) {
      res.render("signup", {
        data: req.body,
        error: mappedError,
      });
    } else {
      res.status(500).json({
        error: mappedError,
      });
    }
  }
};

module.exports = { userValidator, userValidatorHandle };
