const express = require("express");
const Router = express.Router();

const auThenController = require("../app/controllers/AuthenController");
const authenticateToken = require("../middleware/authenticateToken");

Router.post("/register", auThenController.register);
Router.post("/login", auThenController.login);
Router.post("/refresh-token", auThenController.refreshToken);
Router.post("/log-out", authenticateToken, auThenController.logOut);

module.exports = Router;
