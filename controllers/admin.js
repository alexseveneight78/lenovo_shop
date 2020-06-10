const Product = require('../models/product');


exports.getAddProduct = (req,res) => {
    res.render('admin/edit-product', {
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req,res) => {
    const product = new Product(null, req.body.title, req.body.imageUrl,req.body.price, req.body.description);
    console.log(product.imageUrl)
    product.save();
    res.redirect('/');
}

exports.getEditProduct = (req,res) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    })
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.umageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
    updatedProduct.save();
    res.redirect('/admin/products')
}


exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', { prods: products, path: '/admin/products'});
    })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}