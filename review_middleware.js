const Review = require('./modules/reviews.js');
const { reviewSchema } = require('./schema.js');
const ExpressError = require("./utils/ExpressError.js");

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map(el => el.message).join(',');
        next(new ExpressError(errorMessage, 400)); // Using status code 400 for validation errors
    } else {
        next();
    }
};


const isAuthor=async(req,res,next)=>{
    const {id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","You are not author of this lReivew");
         return res.redirect(`/listings/${listing._id}`);
    }
    next();
}
module.exports ={
    validateReview,
    isAuthor,
}


