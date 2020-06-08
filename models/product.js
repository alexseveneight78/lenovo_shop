const fs = require('fs');
const path = require('path')

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
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
    // adding one product to all products
    save(){
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(way, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
    }
    static fetchAll(cb){
        getProductsFromFile(cb)
    }
}