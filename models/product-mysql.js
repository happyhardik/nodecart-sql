const db = require("../utils/database");

const Cart = require("./cart");

module.exports = class Product {
    constructor(id, title, description, imageUrl, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    save() {
        return db.execute("INSERT INTO products (title, description, price, imageUrl) VALUES (?,?,?,?)",
        [this.title,this.description,this.price,this.imageUrl]);
    }

    static fetchAll() {
        return db.execute("SELECT * FROM products")
    }

    static findById(id) {
        return db.execute("SELECT * FROM products WHERE id=?",[id]);
    }

    static deleteById(id) {

    }
}