const User = require("../models/user.js");

// signup Get route
module.exports.renderSignupForm =  (req, res) => {
    res.render("users/signup.ejs");
};

// Signup Post route
module.exports.signup = async (req, res) => {

    try {

        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);

        req.login(registerUser , (err) =>{

            if(err){

                return next(err);
            }

            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        })

    } catch (e) {

        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


// Login Get route
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs")
};

// Login Post route
module.exports.login = async (req, res) => {
    req.flash("success","Welcome back to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

};

// Logout
module.exports.logout = (req , res) =>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }

        req.flash("success" , "you are logged out now!");
        res.redirect("/listings");
    })
};
