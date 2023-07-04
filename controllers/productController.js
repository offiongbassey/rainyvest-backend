const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const {fileSizeFormatter} = require("../util/fileUpload");
const cloudinary = require("cloudinary").v2;
const crypto = require('crypto');
const DailyPrice = require("../models/dailyPriceModel");
const User = require("../models/userModel");
const sequelize = require("../util/Database");

exports.addProduct = asyncHandler(async(req, res, next) => {
    const {name, price, quantity, description} = req.body;
    if(!name){
        res.status(400);
        throw new Error("Product Name is required");
    }
    if(!price){
        res.status(400)
        throw new Error("Product Price is required");
    }
    if(!quantity){
        res.status(400);
        throw new Error("Product Quantity is required");
    }
    if(!description){
        res.status(400);
        throw new Error("Product Description is required");
    }
    let url = name.replace(/\s+/g, '-').replace(/:/g, "-").replace("/", "-").toLowerCase();
    //check if url already exist
    const urlExistence = await Product.findOne({where:{url}});
    if(urlExistence){
        const digest = crypto.randomInt(0,198287);
        url = url+digest
    }
    const productCode = Math.floor(189762552617 + Math.random() * 900000);

    //product image
    let image = '';
    let fileData = {};
    if(req.file){
        //save the image to cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "rainyvest", resource_type: "image" })
        } catch (error) {
            res.status(500);
            throw new Error("Image could not be uploaded")
            
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        };
        image = uploadedFile.secure_url;
    }

    const saveProduct = await req.user
    .createProduct({
        name,
        image,
        price,
        quantity, 
        description,
        status: "Active",
        url,
        productCode
    });
    if(saveProduct){
    res.status(201).json("Product Successfully Created");
    }else{
        res.status(400);
        throw new Error("Sorry, an error occured, please try again later");
    }   
});
exports.updateProduct = asyncHandler(async(req, res, next) => {
    const {name, price, quantity, description} = req.body;
    const {id} = req.params;
    if(!name){
        res.status(400);
        throw new Error("Product Name is required");
    }
    if(!price){
        res.status(400);
        throw new Error("Product Price is requierd");
    }
    if(!quantity){
        res.status(400)
        throw new Error("Product Quantity is required");
    }
    if(!description){
        res.status(400);
        throw new Error("Product Description is required");
    }
    if(!id){
        res.status(400);
        throw new Error("Product Id is required");
    }
    //verify product
    const product = await Product.findOne({where:{id}});
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    let image = product.image;
    let fileData = {};

    if(req.file){
        //save image to cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: 'rainyvest', resource_type: 'image'});
        } catch (error) {
            res.status(400);
            throw new Error("Image could not be uploaded");
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        };
        image = uploadedFile.secure_url;
      
    }
    const oldPrice = product.price;
    const newPrice = price;
    product.name = name,
    product.image = image,
    product.price = price,
    product.quantity = quantity,
    product.description = description,
    product.userId = req.user.id

    const saveProduct = await product.save();
    
    if(saveProduct){
        //create daily price
    if(oldPrice != newPrice){
        await DailyPrice.create({
            price,
            productId: product.id,
            userId: req.user.id
        });
    }
        res.status(200).json("Product successfully updated");
    }else{
        res.status(500);
        throw new Error("An error occured, please try again later");
    }
});

exports.changeProductStatus = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const product = await Product.findOne({where:{id}});
    if(!product){
        res.status(400);
        throw new Error("Invalid Product");
    }
    let status = '';
    if(product.status === 'Active'){
        product.status = 'Inactive'
    }else{
        product.status = 'Active'
    }
    const changeStatus = await product.save();
    if(changeStatus){
        res.status(200).json("Product Status Successfully modified");
    }else{
        res.status(500);
        throw new Error("Sorry, an error occured. Please try again later");
    }
});
exports.getProducts = asyncHandler(async(req, res, next) => {
    const products = await Product.findAll({
        include: [
            {model: User,
            attributes: ['id', 'firstName', 'lastName']
            }
        ],    
        order: [['id', 'DESC']]
    
    });
    if(!products){
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(products);
});
exports.getProduct = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const product = await Product.findOne({
        where:{id},
        attributes: [
            "id",
            "name",
            "image",
            "price",
            "quantity",
            "description",
            "status",
            "url",
            "productCode",
            "userId",
            [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('product.createdAt'), '%D %b %Y'), 'createdAt']   ],
    include: [
        
        {model: DailyPrice, 
        attributes: [
            "id",
            "price",
            [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('dailyprices.createdAt'), '%D %b %Y %h:%i:%p'), 'createdAt'] 
        ]
        }
    ]
    });
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(product);
});

exports.deleteProduct = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const product = await Product.findOne({where:{id}});
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    await product.destroy();
    res.status(200).json("Product successfully deleted");
});

exports.getDailyPrice = asyncHandler(async(req, res, next) => {
const {id} = req.params;
const dailyPrice = await DailyPrice.findAll({where: {productId: id}, order: [['id', 'DESC']]});
if(!dailyPrice){
    res.status(404);
    throw new Error("Daily Price Not found");
}
res.status(200).json(dailyPrice);
});
exports.getActiveProducts = asyncHandler(async(req, res, next) => {
const products = await Product.findAll({where: {status:"Active"}, order:[['id', 'DESC']]});
if(!products){
    res.status(400);
    throw new Error("Products Unavailable");
}
res.status(200).json(products);
});

exports.getSingleProduct = asyncHandler(async(req, res, next) => {
const {url} = req.params;
const product = await Product.findOne({
    where:{url},attributes: [
            "id",
            "name",
            "image",
            "price",
            "quantity",
            "description",
            "status",
            "url",
            "productCode",
            "userId",
            [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('createdAt'), '%D %b %Y'), 'createdAt']   ],
    include: [
        
        {model: DailyPrice, 
        attributes: [
            "id",
            "price",
            [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('dailyprices.createdAt'), '%D %b %Y %h:%i:%p'), 'createdAt'] 
        ]
        }
    ]
});
if(!product){
    res.status(404);
    throw new Error("Product not found");
}
res.status(200).json(product);
});