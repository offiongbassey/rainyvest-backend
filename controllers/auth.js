const passport = require("passport");
require('dotenv').config();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const crypto = require("crypto");
const sequelize = require("../util/Database");



const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET;
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/google/callback`,
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {

    
    const firstName = profile.given_name;
        const lastName = profile.family_name;
        const phone = "";
        const email = profile.email;
        const password = "";
        const googleId = profile.id;
        const accountType = "Google";
        const status = "Active";
    
    //check if user exist with the same email and type not google
    const usualUser = await User.findOne({where: {email, accountType: ""}});
    if(usualUser){
        //update user to google user
        usualUser.googleId = profile.id,
        usualUser.accountType = "Google",
        usualUser.status = "Active"
        await usualUser.save();
        //login user
    }

    //check if email doesn't exist at all
    const user = await User.findOne({where: {email}});
    if(!user){
        //create user 
        //generate token
    let userToken = crypto.randomBytes(30).toString("hex") + email;
    const hashedToken = crypto
    .createHash("sha256")
    .update(userToken)
    .digest('hex');
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password, salt);
    await User.create({
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
        photo: "",
        status,
        role: "User",
        token: hashedToken,
        tokenStatus: "",
        resetToken: "",
        pinToken: "",
        googleId,
        accountType
    
    });
    }
      return done(null, profile);
  }
));

passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
})