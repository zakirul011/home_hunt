const Post = require("./../models/Post");

// getIndexPage
const getIndexPage = (req, res) => {
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

// searching
const searching = async (req, res) => {
  const query = req.query.query;
  const regex = new RegExp(query, "i");
  const posts = await Post.find({
    $or: [{ title: regex }, { address: regex }],
  });
  const postCount = await Post.countDocuments({
    $or: [{ title: regex }, { address: regex }],
  });

  res.render("index", { posts, query, postCount });
};

// export
module.exports = { getIndexPage, searching };
