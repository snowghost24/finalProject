const router = require("express").Router();

const booksController = require("../../controllers/ajaxController").myFunc

// Matches with "/ajax/ajaxCalls"
router.route("/datesold")
  .get(booksController.findAll)
  .post(booksController.dateSold);
  // router.route("/soldprice")
  // .get(booksController.findAll)
  // .post(booksController.soldPrice);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;