const router = require("express").Router();

const booksController = require("../../controllers/nodemailer").myFunc

// Matches with "/ajax/ajaxCalls"
// router.route("/datesold")
//   .get(booksController.findAll)
//   .post(booksController.dateSold);
  router.route("/")
  // .get(booksController.findAll)
  .post(booksController.sendEmail);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;