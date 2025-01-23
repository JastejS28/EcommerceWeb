const Products= require('../models/products');

module.exports.getAdminPage= async (req,res,next)=>{
  await  res.render('admin/home')
}

module.exports.postProductsAdd= async(req,res,next)=>{
    const{name,price,description,imageUrl}= req.body
    try{
      await Products.create({
        name,
        price,
        description,
        imageUrl,
    });
    res.redirect('/admin/products/all')
    }
    catch(err){
      res.send(err)
    }
}

module.exports.getProductsAll= async (req,res,next)=>{
  const products = await Products.find();
  console.log(products);
 let data= {}

  products.forEach(product=>{
    let arr= data[product.category] || []
    arr.push(product);
    data[product.category]= arr
  })
  res.send (data);
}

module.exports.getProductsAdd= (req,res,next)=>{
  res.render('admin/add-products');
}

module.exports.getProductsUpdate= async (req,res,next)=>{
  const {id}= req.params;
  try{
    const product= await Products.findById();
    res.render('admin/update-products',{
      product})
  }
  catch(err){
       next(err)
  }
}

module.exports.getProductsDelete= async (req,res,next)=>{
  const {id}= req.params;
  try{
    const product= await Products.deleteOne({_id:id});
    res.render('/admin/update-products')
    
  }
  catch(err){
       next(err)
  }

}

module.exports.postProductsUpdate=async(req,res,next)=>{
  const{name,price,description,imageUrl,seller, id}= req.body
  try{
    let p= await Products.findById(id);
        p.name = name;
        p.price = price;
        p.description = description;
        p.imageUrl = imageUrl;
        p.seller = seller;
        await p.save();

        res.redirect('/admin/products/all');
  }
  
  
  catch(err){
    res.send(err)
  }
}