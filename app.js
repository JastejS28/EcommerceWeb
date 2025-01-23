const path= require('path');
const express= require('express');
const app= express();
const PORT =4444;
const mongoose= require('mongoose');
const hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials');


app.set('view engine','hbs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

const adminRouter= require('./routes/admin');
app.use('/admin',adminRouter);

const shopRouter= require('./routes/shop');
app.use('/shop',shopRouter)

app.get('/',(req,res,next)=>{
    res.render('index')
})


mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:` + PORT);
    });
}).catch(err => {
    console.log(err)
})