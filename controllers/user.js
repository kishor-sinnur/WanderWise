const User=require("../modules/user.js");

module.exports.rendersignUpform=(req,res)=>{
    res.render("./users/signup.ejs");
}
module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newuser = new User({email,username});
        const registeredUser= await User.register(newuser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Wellcome to WanderWise");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderloginform=(req,res)=>{
    res.render("./users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success", "Welcome back!");
    let RedirectUrl=res.locals.returnTo || "/listings";
    res.redirect(RedirectUrl); 
}

module.exports.logout=(req,res,next)=>{
    req.logout ((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    })
}