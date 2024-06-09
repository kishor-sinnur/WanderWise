const express = require("express");
const router = express.Router();
const Listing = require("../modules/listing");
const wrapAsync = require("../utils/wrapasync");
const { listingSchema } = require('../schema');
const {isLoggedin,validateListing,isOwner}=require("../middleware.js");
const listingController=require("../controllers/listings.js");

const multer=require("multer");
const {storage}=require("../cloudconfig.js");
const upload = multer({storage});


// List all listings
router.get("/", wrapAsync(listingController.index));

// Show form to create new listing
router.get("/new",isLoggedin, listingController.renderCreateform);

// show trending route
router.get("/trending",listingController.trending);

// show rooms route
router.get("/rooms",listingController.rooms);

// show inconic cities
router.get("/cities",listingController.Iconic_city);

// show mountain rooms
router.get("/mountain",listingController.mountain);

// show castle
router.get("/castles",listingController.castle);

// show pools
router.get("/pools",listingController.pools);

// show camp
router.get("/camp",listingController.camp);

// show farm
router.get("/farm",listingController.farms);

// show aractic
router.get("/Arctic",listingController.arctic);

//search
router.get("/search", wrapAsync(listingController.searchListings));

// Add new listing to the database
router.post("/",upload.single('listing[image]'), isLoggedin, wrapAsync(listingController.addlisting));
      

// Show specific listing
router.get("/:id", wrapAsync(listingController.showlisting));

// Show form to edit a listing
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.rendereditform));

// Update a listing
router.put("/:id",upload.single('listing[image]'),isOwner,validateListing,wrapAsync(listingController.updatelisting));

// Delete a listing
router.delete("/:id",isLoggedin,isOwner,wrapAsync(listingController.destroy));    

module.exports = router;
