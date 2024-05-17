const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

const uploader = (subFolder, allowedType, maxSize, uploadError) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/" + subFolder);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxSize,
    },
    fileFilter: (req, file, cb) => {
      if (allowedType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(uploadError));
      }
    },
  });

  return upload;
};

module.exports = uploader;
