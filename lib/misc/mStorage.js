const multer = require("multer");

const path = require("path");
const fs = require("fs");

const uploadPath = path.join(
  __dirname,
  "../../sites/WWW/legekrogen/public/users"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true }); // Recursive: true = muligt at oprette undermapper
}

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // null: ingen fejl, gem til uploadPath
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

module.exports = { userStorage };
