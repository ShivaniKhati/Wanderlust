const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodoOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review= require("./models/review.js");


app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err);
    });

    
app.get("/", (req, res) => {
    res.send("Major Project Started");
});


//function for schema validation middleware
const validateListing = (req,res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}
 
const validateReview = (req,res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

//index route
app.get("/listings",wrapAsync( async (req, res) => {
   const allListing = await Listing.find({});
   //res.send(allListing);
    //console.log(allListing);
   res.render("listings/index.ejs" ,{allListing});
}));

//new route
app.get("/listings/new",  (req, res) => {
   
    res.render("listings/new.ejs");

});

//Show route
app.get("/listings/:id", wrapAsync( async (req, res) => {
   let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});

}));

//create route
app.post("/listings",  validateListing, wrapAsync( async (req, res,next) => {
    

//     let result = listingSchema.validate(req.body);
    
//     console.log(result);
//   // let {title,description,image,price,location,country} = req.params
//     // if(!req.body.listing){
//     //     throw new ExpressError(400, "send valid data for listing");
//     // }
//     if(result.error){
//         throw new ExpressError(400,result.error);
//     }
 const newLisitng = new Listing(req.body.listing);
  await newLisitng.save();
  res.redirect("/listings");
   
}));

// edit route
app.get("/listings/:id/edit",wrapAsync( async (req, res) => {
   
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})

}));

//update route
app.put("/listings/:id",validateListing,  wrapAsync( async (req, res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400, "send valid data for listing");
    // }
    // console.log(req.body);
   let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);

}));

//delete route
app.delete("/listings/:id", wrapAsync(async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// Reviews - Post Route
app.post("/listings/:id/reviews", validateReview ,wrapAsync( async (req, res) => {
    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("New review saved");

  //  res.send("New review saved");
  res.redirect(`/listings/${listing._id}`);
}));

// Delete Review Route
app.delete(
    "/listings/:id/reviews/:reviewId",
    wrapAsync(async (req, res) => {
        let { id, reviewId } = req.params;

        await Listing.findByIdAndUpdate(id, {
            $pull: { reviews: reviewId },
        });

        await Review.findByIdAndDelete(reviewId);

        res.redirect(`/listings/${id}`);
    })
);

//testing route
// app.get("/testListing",async (req, res) => {
//     let sampleListing =  new Listing ({
//         title:"My New Vella",
//         description:"It's vibe is natural",
//         price:12000,
//         location: "Bisides the mountain",
//         country: "Canada"

//     })
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Suceessful");
// });

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    let { statusCode=500 , message ="Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs",{err});
   // res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
})