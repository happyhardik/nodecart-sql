const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

const errorController = require('./controllers/errors');

const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"public")));

app.use((req,res,next) => {
    User.findByPk(1).then((user)=>{
        req.user = user;
        next();
    }).catch(err => console.log(err));
})

app.use("/admin",adminRouter);
app.use(shopRouter);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through: OrderItem});
Product.belongsToMany(Order, {through: OrderItem});

sequelize.sync().then(result => {
    User.findByPk(1).then((user)=>{
        if(!user) {
            return User.create({name: "Hardik Thakker", email: "happpyhardik@gmail.com"});
        }
        return user;
    }).then((user)=>{
        user.getCart().then((cart)=> {
            if(!cart) {
                console.log("Creating cart");
                user.createCart();
            }
        });
    }).then(()=> {
        app.listen(3000);
    });
}).catch(err => console.log(err));

