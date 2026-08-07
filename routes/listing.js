const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");


const Listing = require("../models/listing.js");

const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
 



//index route
router.get("/",wrapAsync( async (req, res) => {
   const allListing = await Listing.find({});
   //res.send(allListing);
    //console.log(allListing);
   res.render("listings/index.ejs" ,{allListing});
}));

//new route
router.get("/new",isLoggedIn,  (req, res) => {
   
    res.render("listings/new.ejs");

});

//Show route
router.get("/:id", wrapAsync( async (req, res) => {
   let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
         return res.redirect("/listings");
    }
   // console.log(listing);
    res.render("listings/show.ejs",{listing});

}));

//create route
router.post("/", isLoggedIn,  validateListing, wrapAsync( async (req, res,next) => {
 const newLisitng = new Listing(req.body.listing);
 newLisitng.owner = req.user._id;
  await newLisitng.save();
  req.flash("success", "New Listing is created!");
  res.redirect("/listings");
   
}));

// edit route
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync( async (req, res) => {
   
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
         return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing})

}));

//update route
router.put("/:id", isLoggedIn,isOwner, validateListing,  wrapAsync( async (req, res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400, "send valid data for listing");
    // }
    // console.log(req.body);
   let {id} = req.params;
    // let listing = await Listing.findById(id);
    // if (!listing.owner.equals(res.locals.currUser._id)) {
    //     req.flash("error", "You don't have permission to edit!");
    //     return res.redirect(`/listings/${id}`);
    // }
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);

}));

//delete route
router.delete("/:id", isLoggedIn,isOwner,  wrapAsync(async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}));

module.exports = router;
