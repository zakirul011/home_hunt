const getIndexPage = (req, res) => {
  const Post = require("./../models/Post");
  Post.find()
    .then((data) => {
      res.locals.posts = data;
      res.render("index");
    })
    .catch((err) => {
      res.locals.error = err;
      res.render("error");
    });
};

// export
module.exports = { getIndexPage };
