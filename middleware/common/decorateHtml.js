const decorateHtml = (title) => {
  return (req, res, next) => {
    res.locals.html = true;
    res.locals.title = title + " | " + process.env.APP_NAME;
    res.locals.error = {};
    res.locals.data = {};
    res.locals.query = "";
    res.locals.postCount = "";
    res.locals.loggedUser = {};

    next();
  };
};

// export
module.exports = decorateHtml;
