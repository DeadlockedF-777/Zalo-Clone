const userRoutes = require("./user.route");
const messageRoute = require("./message.route");
const authenticationRoutes = require("./authen.route");

function router(app) {
  app.use("/api/user", userRoutes);
  app.use("/api/message", messageRoute);
  app.use("/api/auth", authenticationRoutes);
}

module.exports = router;
