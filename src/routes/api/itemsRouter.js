// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Middlewares ************

const authMiddleware = require('../../middlewares/auth');
const sellerMiddleware = require('../../middlewares/seller');
const validator = require('../../middlewares/validator');

// ************ Controller Require ************

const itemsControllerAPI = require('../../controllers/itemsAPIController');

// ************       Routes       ************

router.post('/', itemsControllerAPI.addToCartAPI);  
router.delete('/', itemsControllerAPI.removeFromCartAPI);  

module.exports = router;