const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedin } = require("../middleware.js");
const {validateReview,isAuthor} = require('../review_middleware.js'); // Ensure path is correct
const reviewController=require("../controllers/reviews.js");

// Add review
router.post(
  "/",
  isLoggedin,
  validateReview, // Corrected middleware usage
  wrapAsync(reviewController.createReview)
);

// Delete review
router.delete(
  "/:reviewId",
  isLoggedin,
  isAuthor,
  wrapAsync(reviewController.destroy)
);

module.exports = router;
