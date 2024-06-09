if(process.env.NODE_env!="production"){
    require('dotenv').config();
}
console.log(process.env.CLOUD_NAME);

const express=require("express");
const app=express();
const mongoose=require("mongoose");

const path=require("path");    
const methodoverride=require("method-override");
const ejs_mate=require("ejs-mate");
const session=require("express-session");
const MongoStore = require('connect-mongo'); 
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User=require("./modules/user.js");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter=require("./routes/listings.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

// const Review= require("./modules/reviews.js");
// const MONGO_URL="mongodb://127.0.0.1:27017/WanderWise";

const MONGO_ATLAS=process.env.ATLAS_DB;


app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine("ejs",ejs_mate);
app.use(express.static(path.join(__dirname,"public")));

async function main(){
    await mongoose.connect(MONGO_ATLAS);
};

main() 
    .then((res)=>{
        console.log("connection was successfull done");
    }).catch((err)=>{
        console.log(err);
    });

    
const store1=MongoStore.create({
    mongoUrl:MONGO_ATLAS,
    crypto: {
        secret: 'secretcode'
      }, // See below for details
      touchAfter:24*3600, 
  })

store1.on("error",()=>{
    console.log("error details error is ",err);
})

const session_option = {
    store:store1,
    secret: 'secretcode',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

    // app.get("/",(req,res)=>{
    //     res.send("everthing fucking work");
    // });

    app.use(session(session_option));
    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use((req,res,next)=>{
        // console.log("Session ID:", req.sessionID);
        // console.log("Session Data:", req.session);
        res.locals.success=req.flash("success");
        res.locals.error=req.flash("error");
        res.locals.currentUser = req.user;
        next();
    })
    // index route
      app.use("/listings",listingsRouter);
      app.use("/listings/:id/reviews",reviewRouter);
      app.use("/",userRouter);

    
    app.use("*", (req, res, next) => {
        next(new ExpressError(404, " PAGE NOT FOUND! "));
    });
    
    // Error handling middleware - Generic
    app.use((err, req, res, next) => {
        // Default status code to 500 if not provided
        const status = err.status || 500;
        const message = err.message || 'Internal Server Error';
        res.status(status).render("./listings/error.ejs",{message});
    });

    app.listen(8080,(req,res)=>{
        console.log("server set-up");
    });