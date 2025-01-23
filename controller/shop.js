const Products= require('../models/products');

module.exports.getProductsAll=async (req,res)=>{
    try{
        let products= await Products.find({});
        const {getProductsCategoryWise}= require('../utils/library')
        let categoryProducts= getProductsCategoryWise(products);

    }catch(err){
        res.send(err)
    }
}

module.exports.getHome=async (req,res)=>{
    try{
        let products= await Products.find({});
        const {getProductsCategoryWise}= require('../utils/library')
        let categoryProducts= getProductsCategoryWise(products);
        res.render('shop/home',{
            products: categoryProducts
        })

    }catch(err){
        res.send(err)
    }
}
