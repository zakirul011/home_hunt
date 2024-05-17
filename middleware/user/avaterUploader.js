const uploader = require("./../../utilities/singleUploader");
const avaterUploader = (req, res, next) => {
  const upload = uploader(
    "avaters",
    ["image/jpeg", "image/jpg", "image/png"],
    10000000, // 10mb
    "Only .jpeg, .jpg, .png format is allowed!"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        error: {
          avater: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avaterUploader;
