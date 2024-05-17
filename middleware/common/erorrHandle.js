const createError = require("http-errors");

const notFoundHandle = (req, res, next) => {
  next(createError(404, "Requested Content Not found!"));
};
const errorHandle = (err, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);

  res.locals.html = true;
  res.locals.title = "Error Page" + " | " + process.env.APP_NAME;

  if (res.locals.html) {
    res.render("error");
  } else {
    res.json(res.locals.error);
  }

  console.log(res.locals.error);
};

module.exports = { notFoundHandle, errorHandle };
