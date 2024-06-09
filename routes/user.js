const express=require("express");
const router=express.Router();
const wrapasync = require("../utils/wrapasync.js");
const passport=require("passport");
const userController=require("../controllers/user.js");


// saved redirecturl
const savedRedirectUrl=(req,res,next)=>{
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
  next();
}


router.get("/signup",userController.rendersignUpform);

router.post("/signup", wrapasync(userController.signup));

    router.get("/login",userController.renderloginform);

    router.post("/login",
        savedRedirectUrl,
        passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true
        }),
        userController.login
    );

    router.get("/logout",userController.logout);
    

module.exports=router;
