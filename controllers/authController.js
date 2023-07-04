const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Stock = require("../models/stockModel");
const crypto = require("crypto");
const path = require('path');
const {sendEmail} = require("../util/sendEmail");
const sequelize = require('../util/Database');
const Product = require('../models/productModel');
const Transaction = require("../models/transactionModel");
const Bank = require("../models/bankModel");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

//jwt token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

//test databse
exports.testDb = asyncHandler(async(req, res) => {
    const user = await User.findAll();
    if(user){
        return   res.status(200).json(user);
    }else{
        res.status(500);
        throw new Error("Db not connected");
    }

});


exports.signUp = asyncHandler(async(req, res, next) => {
const {firstName, lastName, phone, email, password, confirmPassword} = req.body;
if(!firstName){
     res.status(400);
    throw new Error("Please, First Name is required");
}
if(!lastName){
    res.status(400);
    throw new Error("Please, Last Name is required");
}
if(!phone){
    res.status(400);
    throw new Error("Please, kindly provide your Phone Number");
}
if(!email){
    res.status(400);
    throw new Error("Please, Email is required");
}
if(!password){
    res.status(400);
    throw new Error("Please, Password is required");
}
if(password !== confirmPassword){
    res.status(400);
    throw new Error("Passwords do not match");
}
//check if user exist
const verifyExistence = await User.findOne({where: {email: email}});
if(verifyExistence){
    res.status(400);
    throw new Error("Sorry, email already exist");
}
    //generate token
    let userToken = crypto.randomBytes(30).toString("hex") + email;
    const hashedToken = crypto
    .createHash("sha256")
    .update(userToken)
    .digest('hex');
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password, salt);
    const user = await User.create({
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
        photo: "",
        status: "Inactive",
        role: "User",
        token: hashedToken,
        tokenStatus: "",
        resetToken: "",
        pinToken: "",
        balance: 0
    
    });
    if(user){

        //send mail
        const confirmUrl = `${process.env.FRONTEND_URL}/confirm-email/${userToken}`;

        const message = `
<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<style>
       * {
           box-sizing: border-box;
       }

       body {
           margin: 0;
           padding: 0;
       }

       a[x-apple-data-detectors] {
           color: inherit !important;
           text-decoration: inherit !important;
       }

       #MessageViewBody a {
           color: inherit;
           text-decoration: none;
       }

       p {
           line-height: inherit
       }

       .desktop_hide,
       .desktop_hide table {
           mso-hide: all;
           display: none;
           max-height: 0px;
           overflow: hidden;
       }

       .image_block img+div {
           display: none;
       }

       @media (max-width:660px) {

           .desktop_hide table.icons-inner,
           .social_block.desktop_hide .social-table {
               display: inline-block !important;
           }

           .icons-inner {
               text-align: center;
           }

           .icons-inner td {
               margin: 0 auto;
           }

           .image_block img.big,
           .row-content {
               width: 100% !important;
           }

           .mobile_hide {
               display: none;
           }

           .stack .column {
               width: 100%;
               display: block;
           }

           .mobile_hide {
               min-height: 0;
               max-height: 0;
               max-width: 0;
               overflow: hidden;
               font-size: 0px;
           }

           .desktop_hide,
           .desktop_hide table {
               display: table !important;
               max-height: none !important;
           }
       }
   </style>
</head>
<body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">

<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="20" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:12px;padding-top:60px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:50px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">

<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
<p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:30px;color:#2b303a;"><strong>Hello ${user.firstName},</strong></span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;"><span style="color:#808389;font-size:15px;">Kindly confirm your email by clicking on the link below. <br/> 
Thank you.
</span></p>
<p>Regards...</p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
<div align="center" class="alignment"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:62px;width:203px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#1aa19c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
<a href="${confirmUrl}" clicktracking=off>${confirmUrl}</a>
<br/>
<a href="${confirmUrl}" clicktracking=off> 
<div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#1aa19c;border-radius:60px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="margin: 0; word-break: break-word; line-height: 32px;"><strong>Confirm Your Email</strong></span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</div>
</a>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:12px;padding-top:60px;">

</body>
</html>

`;
const subject = "Verify your email";
const send_to = user.email;

   await sendEmail(subject, message, send_to);
        res.status(201).json("Verification mail has been sent to you, kindly verify your account.");
    }else{
        res.status(500);
        throw new Error("Sorry, an error occured. Please try again later");
    }
});

exports.signIn = asyncHandler(async(req, res, next) => {
    const {email, password} = req.body;
    if(!email){
        res.status(400);
        throw new Error("Please kindly provide your email");
    }
    if(!password){
        res.status(400);
        throw new Error("Please kindly provide your password");
    }
    //find user
    const user = await User.findOne({where: {email}});
    if(!user){
        res.status(400);
        throw new Error("Sorry, User not found please SignUp");
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if(user && verifyPassword){
        //set cookies and login
        const userToken = generateToken(user.id);

        res.cookie("token", userToken, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: false
        })
        const {id, firstName, lastName, email, phone, role, status, token} = user;
        res.status(200).json({
            id,
            firstName,
            lastName,
            phone,
            email,
            role,
            status,
            token
            
        });

    }else{
        res.status(400);
        throw new Error("Incorrect Password");
    }
});

exports.verifyUser = asyncHandler(async(req, res, next ) => {
    const {token} = req.params;
    const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")

    const user = await User.findOne({where: {token:hashedToken}});
    if(user){
        if(user.status === 'Active'){
        res.status(400);
        throw new Error("Account already verified, please login");
        }
        
        //update user status
        user.status = "Active";
        await user.save();
        res.status(200).json("Account successfully verified");
    }else{
        //invalid token
        res.status(400);
        throw new Error("Invalid Token");
    }
});

exports.logout = asyncHandler(async(req, res, next) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: false
    });
    res.status(200).json("You have successfully logged out");
});

exports.loginStatus = asyncHandler(async(req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return res.json(false);
    }
    const verification = jwt.verify(token, process.env.JWT_SECRET);
    if(verification){
        return res.json(true);
    }
    return res.json(false);
});

exports.getUser = asyncHandler(async(req, res, next) => {
    const user = await User.findOne({where: {id:req.user.id}});
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    const {id, firstName, lastName, phone, email, role, status, balance, accountNumber, accountName, bank, bankId, bankStatus, bankRecipientCode, bankCode} = user;
    res.status(200).json({
        id,
        firstName, 
        lastName, 
        phone,
        email,
        role,
        status,
        balance,
        accountNumber,
        accountName,
        bank,
        bankId,
        bankStatus,
        bankRecipientCode,
        bankCode
    });

});

exports.updateProfile = asyncHandler(async(req, res, next) => {
    const {firstName, lastName, phone} = req.body;
    if(!firstName){
        res.status(400);
        throw new Error("Please provide your First Name");
    }
    if(!lastName){
        res.status(400);
        throw new Error("Please provide your Last Name");
    }
    if(!phone){
        res.status(400);
        throw new Error("Please provide your Phone Number");''
    }
    const user = await User.findOne({where:{id:req.user.id}});
    if(!user){
        res.status(400);
        throw new Error("User not found");
    }
    user.firstName = firstName,
    user.lastName = lastName,
    user.phone = phone

    const saveUser = await user.save();
    if(!saveUser){
        res.status(400);
        throw new Error("Sorry, an error occured, please try again later");
    }
    res.status(200).json("Profile Updated Successfully");
});

exports.resendVerificationMail = asyncHandler(async(req, res, next) => {
    const {email} = req.body;
    if(!email){
        res.status(400);
        throw new Error("Please provide your email");
    }
    const user = await User.findOne({where: {email}});
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    //generate new token
    const token = crypto.randomBytes(30).toString("hex") + email;
    const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
    
    //update the token
    user.token = hashedToken;
    await user.save();


    //send mail
    const confirmUrl = `${process.env.FRONTEND_URL}/confirm-email/${token}`;

    const message = `
<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<style>
   * {
       box-sizing: border-box;
   }

   body {
       margin: 0;
       padding: 0;
   }

   a[x-apple-data-detectors] {
       color: inherit !important;
       text-decoration: inherit !important;
   }

   #MessageViewBody a {
       color: inherit;
       text-decoration: none;
   }

   p {
       line-height: inherit
   }

   .desktop_hide,
   .desktop_hide table {
       mso-hide: all;
       display: none;
       max-height: 0px;
       overflow: hidden;
   }

   .image_block img+div {
       display: none;
   }

   @media (max-width:660px) {

       .desktop_hide table.icons-inner,
       .social_block.desktop_hide .social-table {
           display: inline-block !important;
       }

       .icons-inner {
           text-align: center;
       }

       .icons-inner td {
           margin: 0 auto;
       }

       .image_block img.big,
       .row-content {
           width: 100% !important;
       }

       .mobile_hide {
           display: none;
       }

       .stack .column {
           width: 100%;
           display: block;
       }

       .mobile_hide {
           min-height: 0;
           max-height: 0;
           max-width: 0;
           overflow: hidden;
           font-size: 0px;
       }

       .desktop_hide,
       .desktop_hide table {
           display: table !important;
           max-height: none !important;
       }
   }
</style>
</head>
<body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">

<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="20" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:12px;padding-top:60px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:50px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">

<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
<p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:30px;color:#2b303a;"><strong>Hello ${user.firstName},</strong></span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;"><span style="color:#808389;font-size:15px;">Kindly confirm your email by clicking on the link below. <br/> 
Thank you.
</span></p>
<p>Regards...</p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
<div align="center" class="alignment"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:62px;width:203px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#1aa19c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
<a href="${confirmUrl}" clicktracking=off>${confirmUrl}</a>
<br/>
<a href="${confirmUrl}" clicktracking=off> 
<div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#1aa19c;border-radius:60px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="margin: 0; word-break: break-word; line-height: 32px;"><strong>Confirm Your Email</strong></span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</div>
</a>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:12px;padding-top:60px;">

</body>
</html>

`;
const subject = "Verify your email";
const send_to = user.email;

await sendEmail(subject, message, send_to);
    res.status(200).json("Verification Link successfully sent. Please check your email");
});

exports.forgotPassword = asyncHandler(async(req, res, next) => {
    const {email} = req.body;
    if(!email){
        res.status(400);
        throw new Error("Please provide your email.");
    }
    const user = await User.findOne({where: {email}});
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    //generate token
    const token = crypto.randomBytes(30).toString("hex") + email;
    const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

    //save the token
    user.resetToken = hashedToken;
    await user.save();
    //send mail
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${token}`;

//Reset email
const message = `
<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		@media (max-width:660px) {

			.desktop_hide table.icons-inner,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block img.big,
			.row-content {
				width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
</head>
<body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">

<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="20" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:12px;padding-top:60px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:50px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">

<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
<p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:30px;color:#2b303a;"><strong>Hi ${user.firstName},</strong></span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;"><span style="color:#808389;font-size:15px;">We received a request that you want to change your password, click on the link below to change your password. <br/> 
This reset link is valid for only 30 minutes.
</span></p>
<p>Regards...</p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
<div align="center" class="alignment"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:62px;width:203px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#1aa19c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
<a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
<br/>
<a href="${resetUrl}" clicktracking=off> 
<div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#1aa19c;border-radius:60px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="margin: 0; word-break: break-word; line-height: 32px;"><strong>Reset Password</strong></span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</div>
</a>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:12px;padding-top:60px;">

</body>
</html>

`;
const subject = "Password Reset";
const send_to = user.email;

try {
    await sendEmail(subject, message, send_to);
    res.status(200).json(`Password recovery mail successfully sent, please check your email.`);
} catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again.");
}

 

});
exports.changePassword = asyncHandler(async(req, res, next) => {
    const {token} = req.params;
    const {password, confirmPassword} = req.body;
    if(!token){
        res.status(400);
        throw new Error("Token Unavailable");
    }
    if(!password){
        res.status(400);
        throw new Error("Please provide new password");
    }
    if(password !== confirmPassword){
        res.status(400);
        throw new Error("Passwords do not match");
    }
    //hash token
    const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest('hex');
    const user = await User.findOne({where: {resetToken: hashedToken}});
    if(!user){
        res.status(400);
        throw new Error("Invalid Token");
    }
    //hash new password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;

    const updatePassword = await user.save();
    if(updatePassword){
        res.status(200).json("Password successfully changed");
    }else{
        res.status(400);
        throw new Error("Sorry, an error occured, please try again later");
    }
});

exports.getUsers = asyncHandler(async(req, res, next) => {
    const users = await User.findAll({where: {role:"User"}, order: [
        ['id', 'DESC']
    ],
    attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'role', 'status', 'createdAt']});
    if(!users){
        res.status(400);
        throw new Error("Users not found");
    }
    res.status(200).json(users);
});

exports.getUserById = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const user = await User.findOne({where:{id}, 
        attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'role', 'status', 'balance', 'accountNumber', 'accountName', 'bank']
    
    });
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    const stocks = await Stock.findAll({where: {userId: id}, 
        attributes: [
            "id",
            "price",
            "quantity",
            "total",
            "currentMarketPrice",
            "soldPrice",
            "profit",
            "charges",
            "lastProfit",
            "status",
            "url",
            "stockCode",
            "productId",
            [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('stock.createdAt'), '%D %b %Y %h:%i:%p'), 'createdAt']
        ],
        include: [
            {model: Product},
            {model: User,
            attributes: [
                "id",
                "firstName",
                "lastName",
                "email"
            ]
            }
        ]
    });
    res.status(200).json({user, stocks});
});
exports.getUserTransactions = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const user = await User.findOne({where:{id}, 
        attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'role', 'status', 'balance', 'accountNumber', 'accountName', 'bank']
    
    });
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    const transactions = await Transaction.findAll({where: {userId: id}, 
        attributes: [
            "id",
            "transactionCode",
            "amount",
            "type",
            "description",
            "status",
            [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('transaction.createdAt'), '%D %b %Y %h:%i:%p'), 'createdAt']
        ]
    });
    res.status(200).json({user, transactions});
})
exports.resetPin = asyncHandler(async(req, res, next) => {
    let token = crypto.randomBytes(32).toString("hex") + req.user.email;
    const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
    const user = await User.findOne({where:{id:req.user.id}});
    if(!user){
        res.status(400);
        throw new Error("User does not exist");
    }
    user.pinToken = hashedToken;
    const saveToken = await user.save();
    if(!saveToken){
        res.status(500);
        throw new Error("Sorry, an error Occured, please try again later");
    }

    //send mail
    const resultUrl = `${process.env.FRONTEND_URL}/reset-pin/${token}`;
    //Reset email
const message = `
<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		@media (max-width:660px) {

			.desktop_hide table.icons-inner,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block img.big,
			.row-content {
				width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
</head>
<body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">

<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="20" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:12px;padding-top:60px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:50px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">

<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
<p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:30px;color:#2b303a;"><strong>Hi ${req.user.firstName},</strong></span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;"><span style="color:#808389;font-size:15px;">We received a request that you want to change your Wallet PIN, click on the link below to change your PIN. <br/> 
This reset link is valid for only 30 minutes.
</span></p>
<p>Regards...</p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
<div align="center" class="alignment"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:62px;width:203px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#1aa19c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
<a href="${resultUrl}" clicktracking=off>${resultUrl}</a>
<br/>
<a href="${resultUrl}" clicktracking=off> 
<div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#1aa19c;border-radius:60px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="margin: 0; word-break: break-word; line-height: 32px;"><strong>Reset Password</strong></span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</div>
</a>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:12px;padding-top:60px;">

</body>
</html>

`;
const subject = "Wallet PIN Reset";
const send_to = req.user.email;

try {
    await sendEmail(subject, message, send_to);
    res.status(200).json({success: true, message: "PIN Reset mail successfully sent."});
} catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again.");
}

});


exports.changePin = asyncHandler(async(req, res, next) => {
    const {token} = req.params;
    const {pin, confirmPin} = req.body;
    if(!token){
        res.status(400);
        throw new Error("Pleae Provide Token");
    }
    if(!pin){
        res.status(400);
        throw new Error("Please provide new Pin");
    }
    if(pin !== confirmPin){
        res.status(400);
        throw new Error("Pins do not match");
    }
    //hash token
    const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest('hex');
    const user = await User.findOne({where: {pinToken: hashedToken}});
    if(!user){
        res.status(400);
        throw new Error("Invalid Token");
    }
    //hash new password 
    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(pin, salt);
    user.pin = hashedPin;

    const updatePin = await user.save();
    if(updatePin){
        res.status(200).json("Pin successfully changed");
    }else{
        res.status(400);
        throw new Error("Sorry, an error occured, please try again later");
    }
});

exports.userDashboard = asyncHandler(async(req, res, next) => {
    const stockSold = await Stock.findOne({ where: {userId: req.user.id, status: "Sold"},
    attributes: [
        [sequelize.fn('sum', sequelize.col('lastProfit')), 'stockSold'],
    ],
    raw: true
    });
    const activeStock = await Stock.findOne({where: {userId: req.user.id, status: "Active"},
    attributes: [
        [sequelize.fn('sum', sequelize.col('total')), 'activeStock'],
    ],
    raw: true
    });
    const stockProfit = await Stock.findOne({where: {userId: req.user.id, status: "Sold"},
    attributes: [
        [sequelize.fn('sum', sequelize.col('profit')), 'stockProfit'],
    ],
    raw: true
    });
    const newStockSold = parseInt(stockSold.stockSold);
    const newActiveStock = parseInt(activeStock.activeStock);
    const newStockProfit = parseInt(stockProfit.stockProfit);

    const stocks = await Stock.findAll({ limit: 4, where: {userId:req.user.id, status: "Active"}, 
        include: [
            {model: Product}
        ],
        order: [['id', 'DESC']]});
    res.status(200).json({stockSold: newStockSold, activeStock: newActiveStock, stockProfit: newStockProfit, stocks:stocks});

});

exports.adminDashboard = asyncHandler(async(req, res, next) => {
    const productCount = await Product.findOne({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
        raw: true
        
    });
    const activeStockCount = await Stock.findOne({where: {status: "Active"}, 
    attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'activeStockCount']],
    raw: true
    });

    const soldStockCount = await Stock.findOne({where: {status: "Sold"}, 
    attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'soldStockCount']],
    raw: true
    });

    const stockSold = await Stock.findOne({ where: {status: "Sold"},
    attributes: [[sequelize.fn('sum', sequelize.col('lastProfit')), 'stockSold']],
    raw: true
    });
    const activeStock = await Stock.findOne({where: { status: "Active"},
    attributes: [[sequelize.fn('sum', sequelize.col('total')), 'activeStock']],
    raw: true
    });
    const stockProfit = await Stock.findOne({where: {status: "Sold"},
    attributes: [[sequelize.fn('sum', sequelize.col('profit')), 'stockProfit']],
    raw: true
    });
    const stocks = await Stock.findAll({ limit: 8, where: {status: "Active"}, 
        include: [
            {model: Product}
        ],
        order: [['id', 'DESC']]});
    const newStockSold = parseInt(stockSold.stockSold);
    const newActiveStock = parseInt(activeStock.activeStock);
    const newStockProfit = parseInt(stockProfit.stockProfit);
    res.status(200).json({productCount: productCount.count, activeStockCount: activeStockCount.activeStockCount, soldStockCount: soldStockCount.soldStockCount,
        stockSold: newStockSold, activeStock: newActiveStock, stockProfit: newStockProfit, stocks: stocks
    });
});

exports.getActiveBanks = asyncHandler(async(req, res, next) => {
    const banks = await Bank.findAll({where: {status: "Active"}});
    if(!banks){
        res.status(404);
        throw new Error("Banks not available");
    }
    res.status(200).json(banks);
})


exports.verifyBankInfo = asyncHandler(async(req, response, next) => {
    const {type, account_number, bank, currency} = req.body;
    
    if(!account_number){
        response.status(400);
        throw new Error("Account Number is required");
    }
    if(!bank){
        response.status(400);
        throw new Error("Please Select a Bank");
    }
    const userBank = await Bank.findOne({ where: {id: bank}});
    if(!userBank){
        response.status(400);
        throw new Error("Please Select a Bank");
    }
    const bank_code = userBank.code;


    const https = require('https')

const params = JSON.stringify({
"type": type,
"name": "",
"account_number": account_number,
"bank_code": bank_code,
"currency": currency
})
const options = {
hostname: 'api.paystack.co',
port: 443,
path: '/transferrecipient',
method: 'POST',
headers: {
Authorization: process.env.PAYSTACK_LIVE_KEY,
'Content-Type': 'application/json'
}
}
const reqs = https.request(options, res => {
let data = ''
res.on('data', (chunk) => {
data += chunk
});
res.on('end', () => {
console.log(JSON.parse(data));
const newData = JSON.parse(data);
if(newData.status === true){
    const userId = req.user.id;

    // console.log(userId);
    newAccountNumber = newData.data.details.account_number;
    newAccountName = newData.data.details.account_name;
    newBankName =  newData.data.details.bank_name;
    newBankId = bank;
    newBankVerificationId = newData.data.id;
    newBankRecipientCode = newData.data.recipient_code;
    newBankCode = bank_code
    
    updateLecturerBankInfo(newAccountName, userId, newAccountNumber, newBankName, newBankId, newBankRecipientCode, newBankCode);
}
response.status(200).json(newData);
})
}).on('error', error => {
response = (error);
console.error(error)
response.status(500);
throw new Error(`An Error occured, try again later. Err${error}`);
})
reqs.write(params)
reqs.end()
});
const updateLecturerBankInfo = asyncHandler(async(newAccountName, userId, newAccountNumber, newBankName, newBankId, newBankRecipientCode, newBankCode) => {
     // update user profile
     const user = await User.findOne({where: {id: userId}});
     user.accountNumber = newAccountNumber;
     user.accountName = newAccountName;
     user.bank = newBankName;
     user.bankId = newBankId;
     user.bankStatus = "Active";
     user.bankRecipientCode = newBankRecipientCode;
     user.bankCode = newBankCode;

 const saveUser = await user.save();

});

var secret = process.env.PAYSTACK_LIVE_KEY;
exports.transferWebhook = asyncHandler(async(req, res) => {
// Using Express
//validate event

const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
if (hash == req.headers['x-paystack-signature']) {
// Retrieve the request's body
const event = req.body;
const data = req.body;
const reference = data.reference;

// Do something with event  
    console.log(event);
    //get reference from withdraw
    // const withdraw = await Withdraw.findOne({transactionCode: reference});
    // if(!withdraw){
    //     res.status(500);
    //     throw new Error("Transaction code not found");
    // }
    // if(event === "transfer.success"){
    // withdraw.status = 'Verified';
    // await withdraw.save();
    // return res.send(200).json(`Transfer webhook success. ${reference}`);
    // }else if(event === "transfer.failed"){
    //     return res.send(200).json(`Withdrawal Failed. ${reference}`);
    // }else if (event === "transfer.reversed"){
    //     return res.send(200).json(`Withdrawal Reversed. ${reference}`);
    // }

}else{
    res.send("Something went wrong");
    console.log("Something went wrong");
}


});





//paystack withdraw documentation
exports.withdrawFunds = asyncHandler(async(request, response, next) => {
    const https = require('https');

    const {amount, pin} = request.body;
    transactionCode = Math.floor(100000000000 + Math.random() * 9765431234567);
    if(!request.user.pin){
        response.status(400);
        throw new Error("Please Create a withdrawal Pin");
    }
    
    
    if(!amount){
        response.status(400);
        throw new Error("Please provide amount");
    }
    
    if(!pin){
        response.status(400);
        throw new Error("Please provide Pin");
    }
    //limit withdrawal
    if(amount > 1){
        response.status(400);
        throw new Error("This is a test mode, you can only withdraw 1 Naira");
    }
    //verify pin
    const checkPassword = await bcrypt.compare(pin, request.user.pin);
    if(!checkPassword){
        response.status(400);
        throw new Error("Incorrect PIN");
    }


    if(amount > request.user.balance){
        response.status(400);
        throw new Error("Insufficient Funds: Amount greater than your current balance.");
    }


const params = JSON.stringify({

"source": "balance",

"amount": amount * 100,

"reference": transactionCode,

"recipient": request.user.bankRecipientCode,

"reason": "RainyVest"

})


const options = {

hostname: 'api.paystack.co',

port: 443,

path: '/transfer',

method: 'POST',

headers: {

Authorization:  process.env.PAYSTACK_LIVE_KEY,

'Content-Type': 'application/json'

}

}
const req = https.request(options, res => {
let data = ''
res.on('data', (chunk) => {
data += chunk
});
res.on('end', () => {
// console.log(JSON.parse(data))
const newData = JSON.parse(data);
if(newData.status === true){
const userId = request.user.id;
const userBalance = request.user.balance;
const userFirstName = request.user.firstName;
const userLastName = request.user.lastName;
const userEmail = request.user.email;
approveWithdraw(userId, amount, userBalance, transactionCode, userFirstName, userLastName, userEmail);
}
response.status(200).json(newData);
})

}).on('error', error => {
console.error(error)
})
req.write(params)
req.end()
// response.status(201).json({message: "Transaction Successful"});
});

 const approveWithdraw = asyncHandler(async(userId, amount, userBalance, transactionCode, userFirstName, userLastName, userEmail) => {
    
    const newBalance = userBalance - amount;
    await Transaction.create({
            amount,
            transactionCode,
            type: "Credit",
            description: "Withdraw",
            status: "Successful",
            userId
        });
    
    const currentUser = await User.findOne({ where: {id: userId}});
    currentUser.balance = userBalance - amount;
    
    const updateBalance = await currentUser.save();
    //send withdrawal mail
    const currentBalance = updateBalance.balance;
    const resultUrl = `${process.env.FRONTEND_URL}/transactions`;

//send mail to author
let message = `
<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
    }

    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
    }

    #MessageViewBody a {
        color: inherit;
        text-decoration: none;
    }

    p {
        line-height: inherit
    }

    .desktop_hide,
    .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
    }

    .image_block img+div {
        display: none;
    }

    @media (max-width:660px) {

        .desktop_hide table.icons-inner,
        .social_block.desktop_hide .social-table {
            display: inline-block !important;
        }

        .icons-inner {
            text-align: center;
        }

        .icons-inner td {
            margin: 0 auto;
        }

        .image_block img.big,
        .row-content {
            width: 100% !important;
        }

        .mobile_hide {
            display: none;
        }

        .stack .column {
            width: 100%;
            display: block;
        }

        .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
            display: table !important;
            max-height: none !important;
        }
    }
</style>
</head>
<body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">

<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="20" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 640px;" width="640">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:12px;padding-top:60px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:50px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">
<img src="https://res.cloudinary.com/dfhabqprq/image/upload/v1684559158/schoolstore/success_l1xuqj.png" style="width: 600px; text-align: center;" />
<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
<p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><span style="font-size:30px;color:#2b303a;"><strong>Transaction Successful</strong></span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;"><span style="color:#808389;font-size:15px;">Dear ${userFirstName + ' ' + userLastName}, you have successfully withdrawn ₦${amount.toLocaleString(undefined, {maximumFactorDigits: 2})} from your account.
</span></p>
<br/>
<p style="margin: 0; font-size: 14px;">Current Balance: ₦${currentBalance.toLocaleString()}<br/>
</p>
<p>Best Regards!</p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
<div align="center" class="alignment"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:62px;width:203px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#1aa19c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
<br/>
<a href="${resultUrl}" clicktracking=off> 
<div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#1aa19c;border-radius:60px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="margin: 0; word-break: break-word; line-height: 32px;"><strong>View More</strong></span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</div>
</a>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:12px;padding-top:60px;">

</body>
</html>

`;
let subject = `Transaction Successful : ${transactionCode}`;
let send_to = userEmail;

await sendEmail(subject, message, send_to);

});
