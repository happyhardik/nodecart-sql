const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Product = sequelize.define( "product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    price: Sequelize.DOUBLE,
    description: Sequelize.STRING
});

module.exports = Product;