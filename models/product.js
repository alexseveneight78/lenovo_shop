const fs = require('fs');
const path = require('path')

const products = [];
const way = path.join(__dirname, '../data', 'products.json')

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
    save(){
        fs.readFile(way, (err, fileContent) => {
            if(err) {
                return [];
            }
            JSON.parse(fileContent);
        });
        products.push(this);
        fs.writeFile(way, JSON.stringify(products))
    }
    static fetchAll(){
        return products;
    }

}