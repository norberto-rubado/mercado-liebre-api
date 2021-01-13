// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Middlewares ************

const authMiddleware = require('../../middlewares/auth');
const sellerMiddleware = require('../../middlewares/seller');
const validator = require('../../middlewares/validator');

// ************ Controller Require ************

const productsAPIController = require('../../controllers/productsAPIController');

// ************  Multer Config  ***************

var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/products'))
   },
   filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
   }
})

var upload = multer({
   storage,

   // Validate image
   fileFilter: (req, file, cb) => {

      const acceptedExtensions = ['.jpg', '.jpeg', '.png'];

      const ext = path.extname(file.originalname);
      
      if (!acceptedExtensions.includes(ext)) {
         req.file = file;
      }

      cb(null, acceptedExtensions.includes(ext));
   }
});


// ************       Routes       ************

router.get('/',productsAPIController.index); /* GET - All products - index */

module.exports = router;