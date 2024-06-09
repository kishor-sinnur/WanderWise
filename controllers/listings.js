  const Listing = require("../modules/listing");
  const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
  const Map_token=process.env.MAP_API;
  const geocodingClient = mbxgeocoding({ accessToken: Map_token });

  module.exports.index=async (req, res) => {
      const allListings = await Listing.find({});
      res.render("./listings/index.ejs", { allListings });
  }

  module.exports.renderCreateform=(req, res) => {
      res.render("./listings/add_new.ejs"); // Ensure this view exists
  }

  module.exports.addlisting=async (req, res) => {
      let response = await geocodingClient.forwardGeocode({
          query: req.body.listing.location,
          limit: 1,    
        }).send();

      console.log(response.body.features[0].geometry);

      let url=req.file.path;
      let filename=req.file.filename;
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.image={url,filename};

      newListing.geo_metry=response.body.features[0].geometry;
      console.log(url ,"..", filename);
      let result=await newListing.save();
      console.log(result);
      req.flash("success", "New Listing Created!");
      res.redirect("/listings");
  }

  module.exports.showlisting=async (req, res) => {
      const { id } = req.params;
      const new_listing = await Listing.findById(id)
      .populate({ path: "Reviews", populate: { path: "author" } })
      .populate("owner");
      if (!new_listing) {
          req.flash("error", "Listing does not exist!");
          return res.redirect("/listings");
      }
      res.render("./listings/show.ejs", { new_listing });
  }

  module.exports.trending=async (req, res) => {
        const trendingListings = await Listing.find({ Category: 'Trending' })
        if (! trendingListings || trendingListings.length === 0) {
          req.flash("error", "Listing does not exist!");
          return res.redirect("/listings");
      }
      res.render('./listings/trending', { allListings: trendingListings });
    }

    module.exports.rooms=async (req, res) => {
      const Listings = await Listing.find({ Category: 'Rooms' })
      if (! Listings || Listings.length === 0) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render('./listings/rooms', { allListings: Listings });
  }
  module.exports.Iconic_city=async (req, res) => {
      const Listings = await Listing.find({ Category: 'Iconic cities' })
      if (! Listings ||Listings.length === 0) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render('./listings/iconic', { allListings: Listings });
  }

  module.exports.mountain=async (req, res) => {
      const Listings = await Listing.find({ Category: 'Mountains' })
      if (! Listings ||Listings.length === 0) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render('./listings/mountain', { allListings: Listings });
  }

  module.exports.castle=async (req, res) => {
      const Listings = await Listing.find({ Category: 'Castles' })
      if (! Listings || Listings.length === 0) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render('./listings/castles', { allListings: Listings });
  }

  module.exports.pools=async (req, res) => {
      const Listings = await Listing.find({ Category: 'Amazing Pools' })
      if (! Listings || Listings.length === 0) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render('./listings/pools', { allListings: Listings });
  }

  module.exports.camp=async (req, res) => {
      const Listings = await Listing.find({ Category: 'Camping' })
      if (! Listings || Listings.length === 0) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render('./listings/camping', { allListings: Listings });
  }

  module.exports.farms=async (req, res) => {
      const Listings = await Listing.find({ Category: 'Farms' })
      if (! Listings || Listings.length === 0) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render('./listings/farm', { allListings: Listings });
  }

  module.exports.arctic=async (req, res) => {
      const Listings = await Listing.find({ Category: 'Arctic' })
      if (!Listings || Listings.length === 0) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render('./listings/arctic', { allListings: Listings });
  }


  // search query

  module.exports.searchListings = async (req, res) => {
    const query = req.query.query ? req.query.query.toString() : '';
    console.log('Search query:', query); // Debugging log
    if (typeof query !== 'string') {
      req.flash('Location must be a string.');
      return  res.redirect("/listings");
  }
    const searchResults = await Listing.find({ location: { $regex: query, $options: "i" } });
    console.log('Search results:', searchResults); // Debugging log
    res.render("./listings/search.ejs", { searchResults, query });
};

  module.exports.rendereditform=async (req, res) => {
      const { id } = req.params;
      const edit_listing = await Listing.findById(id);
      if (!edit_listing) {
          req.flash("error", "Listing does not exist!");
          return res.redirect("/listings");
      }
      let image_url=edit_listing.image.url;
      image_url=image_url.replace("/upload","/upload/h_250,w_250");
      res.render("./listings/edit.ejs", { edit_listing, image_url });
  }

  module.exports.updatelisting=async (req, res) => {
      const { id } = req.params;
      const updateData = req.body.listing;
      const listing = await Listing.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
      if(typeof req.file!=="undefined"){
          let url=req.file.path;
          let filename=req.file.filename;
          listing.image={url,filename};
          await listing.save();
      }
      req.flash("success", "Listing Updated!");
      res.redirect(`/listings/${listing._id}`);
  }

  module.exports.destroy=async (req, res) => {
      const { id } = req.params;
      await Listing.findByIdAndDelete(id);
      req.flash("success", "Listing Deleted!");
      res.redirect("/listings");
  }
