const express = require("express");
const Router = express.Router();
const multer = require("multer");
const authenticateToken = require("../middleware/authenticateToken");
const messageController = require("../app/controllers/MessageController");

const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/upload/image/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const storageFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/upload/file/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const uploadImage = multer({ storage: storageImage, fileFilter: imageFilter });
const uploadFile = multer({ storage: storageFile });

Router.get("/get-all-messages", authenticateToken, messageController.getAllMessages);
Router.get("/get-latest-message", authenticateToken, messageController.getLatestMessage);
Router.post("/add-message", authenticateToken, messageController.addMessage);
Router.post("/add-interactive", authenticateToken, messageController.addInteractive);
Router.post(
  "/upload-image",
  authenticateToken,
  uploadImage.single("image"),
  messageController.uploadImage
);
Router.post(
  "/upload-file",
  authenticateToken,
  uploadFile.single("file"),
  messageController.uploadFile
);

module.exports = Router;
