const { check, validationResult } = require("express-validator");

const postValidator = [
  check("title").isLength({ min: 1 }).withMessage("Title is required").trim(),
  check("bed").isLength({ min: 1 }).withMessage("Bed number is required"),
  check("bath").isLength({ min: 1 }).withMessage("Bath number is required"),
  check("price").isLength({ min: 1 }).withMessage("Price is required"),
  check("mobile")
    .isMobilePhone("bn-BD")
    .withMessage("Mobile Number must be Bangladeshi mobile number"),
  check("email").isEmail().withMessage("Invalid email address!").trim(),
  check("address")
    .isLength({ min: 1 })
    .withMessage("Address is required")
    .trim(),
];

const postValidatorHanlder = (req, res, next) => {
  const errors = validationResult(req);
  const mappedError = errors.mapped();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/post/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    // response the errors
    res.render("post", {
      data: req.body,
      error: mappedError,
    });
  }
};

module.exports = { postValidator, postValidatorHanlder };
