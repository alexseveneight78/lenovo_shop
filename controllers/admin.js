const Product = require('../models/product');

exports.addProduct = (req,res) => {
    res.render('add-product')
}

exports.renderProduct = (req,res) => {
    const product = new Product(req.body.title, req.body.imageUrl,req.body.price, req.body.description);
    product.save();
    res.redirect('/');
}

