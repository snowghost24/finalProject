const router = require("express").Router();
const requestsRoutes = require("./requests");

// Book routes
router.use("/nodemailer", requestsRoutes);

module.exports = router;
