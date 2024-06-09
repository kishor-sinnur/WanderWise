const Listing=require("../modules/listing");
const Review = require("../modules/reviews.js");
const ExpressError = require("../utils/ExpressError");

module.exports.createReview=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError("Listing not found", 404);
    }
    const newReview = new Review(req.body.review);
    console.log(newReview);
    newReview.author = req.user._id;
    listing.Reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
  }

module.exports.destroy=async (req, res) => {
    const { id, reviewId } = req.params;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      throw new ExpressError("Review not found", 404);
    }
    await Listing.findByIdAndUpdate(id, { $pull: { Reviews: reviewId } });
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  }