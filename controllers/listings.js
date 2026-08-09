const Listing = require("../models/listing.js");
const axios = require("axios");

//index route
module.exports.index = async (req, res) => {
   const allListing = await Listing.find({});
   //res.send(allListing);
    //console.log(allListing);
   res.render("listings/index.ejs" ,{allListing});
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

 module.exports.showListing = async (req, res) => {
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

}

module.exports.createListing = async (req, res,next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    let response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
            q: req.body.listing.location,
            format: "json",
            limit: 1
        },
        headers: {
            "User-Agent": "WanderlustProject/1.0"
        }
    });

 const newLisitng = new Listing(req.body.listing);
 newLisitng.owner = req.user._id;
 newLisitng.image = {url, filename};

    if (response.data.length > 0) {
        newLisitng.geometry = {
            type: "Point",
            coordinates: [
                parseFloat(response.data[0].lon),
                parseFloat(response.data[0].lat)
            ]
        };
    } else {
        newLisitng.geometry = { type: "Point", coordinates: [0, 0] };
    }
    
  await newLisitng.save();
  req.flash("success", "New Listing is created!");
  res.redirect("/listings");
   
}

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
         return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace(
            "/upload",
            "/upload/w_250"
        );

    res.render("listings/edit.ejs", {
        listing,
        originalImageUrl
    });


}

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;  
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});


    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);

}

module.exports.destroyListing = async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}