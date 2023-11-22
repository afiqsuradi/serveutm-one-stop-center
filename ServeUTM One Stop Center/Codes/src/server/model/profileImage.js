const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const maxSize = 2 * 1024 * 1024; // 2MB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/profileImages/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + uuidv4() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.size > maxSize) {
    return cb(new Error("File too large"), false);
  }

  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    return cb(null, true);
  }
  return cb(new Error("Invalid file type"), false);
};

let upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
});

module.exports = upload;
