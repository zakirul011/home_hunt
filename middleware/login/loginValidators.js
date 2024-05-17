const { check, validationResult } = require("express-validator");

const LoginValidation = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Mobile or Email is required!"),
  check("password").isLength({ min: 1 }).withMessage("Password is required!"),
];

const loginValidationHandle = function (req, res, next) {
  const error = validationResult(req);
  const mappedError = error.mapped();
  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    res.render("login", {
      data: {
        username: req.body.username,
      },
      error: mappedError,
    });
  }
};

module.exports = { LoginValidation, loginValidationHandle };
