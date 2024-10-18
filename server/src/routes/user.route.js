const express = require("express");
const Router = express.Router();
const userController = require("../app/controllers/UserController");
const authenticateToken = require("../middleware/authenticateToken");
const multer = require("multer");

const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/upload/profile-image/");
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

Router.get("/get-friends", authenticateToken, userController.getFriends);
Router.post("/update-information", authenticateToken, userController.updateInformationUser);
Router.post(
  "/upload-profile-image",
  authenticateToken,
  uploadImage.single("profile-image"),
  userController.uploadAvatar
);
Router.get("/search-users", authenticateToken, userController.searchUsers);
Router.post("/add-friend", authenticateToken, userController.addFiend);

Router.get("/:phone", authenticateToken, userController.getInformationUser);

module.exports = Router;
