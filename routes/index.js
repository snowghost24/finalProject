const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const ajaxRoutes = require("./ajax");
const ajaxRoutes2 = require("./ajax2");
const emailRoutes = require("./emails");
// API Routes
router.route("/oauthcallback",(req,res)=>{
  res.redirect("/")
})
router.use("/api", apiRoutes);
router.use("/ajax", ajaxRoutes);
router.use("/ajax2", ajaxRoutes2);
router.use("/emailer", emailRoutes);
// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
