const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-complete", "root", "admin123", {
    "host":"localhost",
    dialect: "mysql"
})

module.exports = sequelize;

//mongodb+srv://mongodb_user:urvi222jogF7ydSL@cluster0-lz5u1.gcp.mongodb.net/test?retryWrites=true&w=majority