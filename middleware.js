const wrapAsync = require("./utils/wrapasync");
const ExpressError = require("./utils/ExpressError");
const Listing = require("./modules/listing");
const { listingSchema, reviewSchema } = require('./schema');
const mongoose = require('mongoose'); 

// isLoggedin middleware before accessing the listing
module.exports.isLoggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be logged in to access the listing!");
        return res.redirect("/login");
    }
    next();
};
// Validation Middleware
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errorMessage);
    } else {
        next();
    }
};

// permision to accessing the listings
module.exports.isOwner=async(req,res,next)=>{
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash("error", "Invalid listing ID");
        return res.redirect('/listings');
    }
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("error","You are not owner of this listings");
         return res.redirect(`/listings/${listing._id}`);
    }
    next();
}

 // review server side validation
 