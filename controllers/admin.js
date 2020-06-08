const Product = require('../models/product');


exports.getAddProduct = (req,res) => {
    res.render('admin/add-product', {
        path: '/admin/add-product'
    })
}

exports.postAddProduct = (req,res) => {
    const product = new Product(req.body.title, req.body.imageUrl,req.body.price, req.body.description);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', { prods: products, path: '/admin/products'});
    })
}