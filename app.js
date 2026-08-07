const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");




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



 //session options
 
 const sessionOptions= {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
     cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
 }

 app.get("/", (req, res) => {
    res.send("Major Project Started");
});

 app.use(session(sessionOptions));
 app.use(flash()); // we should use flash before routes

 app.use(passport.initialize());
 app.use(passport.session());

 passport.use(new LocalStrategy(User.authenticate()));

 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());


    
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;  // req.user is used to check user is logged in or not
    next();
})

//fake user
// app.get("/demouser", async (req, res) => {

//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student",
//     });

//     let registeredUser = await User.register(
//         fakeUser,
//         "helloworld"
//     );

//     res.send(registeredUser);

// });

 


// for listing routes
app.use("/listings",listingRouter);

// for review routes
app.use("/listings/:id/reviews",reviewRouter);

// for userRouter
app.use("/", userRouter);




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