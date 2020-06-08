const Product = require('../models/product');

exports.shop = (req,res,next) => {
    Product.fetchAll((products) => {
        res.render('shop', { prods: products});
    })
}