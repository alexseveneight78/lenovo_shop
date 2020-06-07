const Product = require('../models/product');

exports.shop = (req,res,next) => {
    const products = Product.fetchAll()
    res.render('shop', { prods: products});
}