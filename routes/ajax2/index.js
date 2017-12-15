const router = require("express").Router();
const requestsRoutes = require("./requests");

// Book routes
router.use("/ajaxcalls", requestsRoutes);

module.exports = router;
