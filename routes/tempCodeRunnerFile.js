const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../modules/listing.js");
const Review = require("../modules/reviews.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapasync.js");
const {isLoggedin} = require("../middleware.js");
const {reviewSchema } = require('../schema.js');


const review_Schema = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map(el => el.message).join(',');
        throw new ExpressError(errorMessage, 404);
    }
    next();
};


//  console.log("reviewSchema Middleware: ", reviewSchema); // Add this line for debugging
 console.log(isLoggedin);

// Add review
router.post(
  "/",
  isLoggedin,
  review_Schema, // Corrected middleware usage
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError("Listing not found", 404);
    }
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.Reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
})
);

// Delete review
router.delete(
  "/:reviewId",
  isLoggedin,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      throw new ExpressError("Review not found", 404);
    }
    await Listing.findByIdAndUpdate(id, { $pull: { Reviews: reviewId } });
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
