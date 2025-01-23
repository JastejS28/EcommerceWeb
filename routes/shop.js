const path= require('path')
const express= require('express')
const router= express.Router()

const shopController= require('../controller/shop');
router.get('/',shopController.getHome)
router.get('/products/all',shopController.getProductsAll);


module.exports= router;