const uploader = require("../../utilities/singleUploader");

const postUpload = (req, res, next) => {
  const upload = uploader(
    "post",
    ["image/jpeg", "image/jpg", "image/png"],
    10000000,
    "Image Upload failed!"
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          file: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = postUpload;
