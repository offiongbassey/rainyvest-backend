const express = require("express");
const { addProduct, updateProduct, changeProductStatus, getProducts, getProduct, deleteProduct, getDailyPrice, getActiveProducts, getSingleProduct } = require("../controllers/productController");
const router = express.Router();
const { adminMiddleWare } = require('../middleWare/adminMiddleWare');
const {upload} = require("../util/fileUpload");

router.post('/create', adminMiddleWare, upload.single('image'), addProduct);
router.patch('/update/:id', adminMiddleWare, upload.single('image'), updateProduct);
router.patch('/updatestatus/:id', adminMiddleWare, changeProductStatus);
router.get('/dailyprice/:id', adminMiddleWare, getDailyPrice);
router.get('/active', getActiveProducts);
router.get('/:id', adminMiddleWare, getProduct);
router.delete('/delete/:id', adminMiddleWare, deleteProduct);
router.get('/userproduct/:url', getSingleProduct);
router.get('', adminMiddleWare, getProducts);


module.exports = router;