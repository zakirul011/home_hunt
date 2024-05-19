const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  req.user = {};
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookies) {
    try {
      token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (res.locals.html) {
        res.locals.loggedUser = decoded;
      }
    } catch (err) {
      console.log(err);
    }
  }

  next();
};

const redirectLoginPage = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (!cookies) {
    next();
  } else {
    res.redirect("/");
  }
};

const requiredRole = (roles) => {
  return (req, res, next) => {
    if (req.user.role && roles.includes(req.user.role)) {
      next();
    } else {
      if (res.locals.html) {
        next(createHttpError(401, "You are not allow to access the Page"));
      } else {
        res.json({
          error: {
            common: {
              msg: "You are not allow to access the Page",
            },
          },
        });
      }
    }
  };
};

module.exports = { checkLogin, redirectLoginPage, requiredRole };
