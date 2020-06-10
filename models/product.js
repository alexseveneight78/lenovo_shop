const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const way = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
let products = [];

// checking for file`s existence and getting all products in an array
const getProductsFromFile = (cb) => {
    fs.readFile(way, (err, fileContent) => {
        if(err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent))
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
    // adding one product to all products
    save(){
        getProductsFromFile(products => {
            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(way, JSON.stringify(updatedProducts), (err) => {
                    console.log(err)
                })
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(way, JSON.stringify(products), (err) => {
                    console.log(err)
                })
            }

        })
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(way, JSON.stringify(updatedProducts), err => {
                if(!err) {
                    Cart.deleteProduct(id, product.price);
                }
            })
        })
    }

    static fetchAll(cb){
        getProductsFromFile(cb)
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product)
        })
    }
}