const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env')});

exports.adminMiddleWare = asyncHandler(async(req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            res.status(401);
            throw new Error("Not Authorized, please login");
        }
        const verification = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({where: {id:verification.id, role:"Admin"}});
        if(!user){
            res.status(404);
            throw new Error("Authorization Failed");
        }
        req.user = user;
        next();
        
    } catch (error) {
        res.status(404);
        throw new Error("Not Authorized, Please Login");
    }
})