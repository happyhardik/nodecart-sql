const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getCart = (req,res,next) => {
    console.log("Get Cart");
    req.user.getCart().then((cart) => {
        cart.getProducts().then((products) => {
            cart.products = products;
            res.render("shop/cart", {title: "My Cart",path:"/cart",cart:cart});
        });
    }).catch((err)=> console.log(err));
}

exports.postCart = (req,res,next) => {
    console.log("Post Cart");
    const productId = req.body.productId;
    let fetchedCart;
    let newQty = 1;
    req.user.getCart()
    .then((cart)=> {
        fetchedCart = cart;
        return cart.getProducts({where:{id:productId}});
    }).then((products)=>{
        //if product exists
        if(products.length > 0) {
            const product = products[0];
            const oldQty = product.cartItem.qty;
            newQty = oldQty+1;
            return product;
        } else {
            return Product.findByPk(productId);
        }
    }).then(product => {
        fetchedCart.addProduct(product,{through: {"qty": newQty}});
        res.redirect("/cart");
    }).catch((err)=> console.log(err)); 
}

exports.getCheckout = (req,res,next) => {
    console.log("Checkout");
    res.render("shop/checkout", {title: "Checkout",path:"/checkout"});
}

exports.getIndex = (req,res,next) => {
    console.log("Index Called");
    Product.findAll().then(products => {
        res.render("shop/index",{title: "My Shop", products: products,path:"/"});
    }).catch((err)=> console.log(err)); 
}

exports.getOrders = (req,res,next) => {
    console.log("Get Orders");
    /*req.user.getOrders()
    .then(orders => {
        let promises = orders.map(order => {
            return order.getProducts()
            .then((products) => {
                order.products = products;
                return order;
            });
        })
        Promise.all(promises).then(() => {
            console.log(orders);
            res.render("shop/orders", {title: "Orders",path:"/orders", orders: orders});
        })
        
    })*/
    req.user.getOrders({include:["products"]})
    .then((orders)=> {
        res.render("shop/orders", {title: "Orders",path:"/orders", orders: orders});
    })
    .catch((err)=> console.log(err)); 
}

exports.postCartItemDelete = (req,res,next) => {
    req.user.getCart().then((cart) =>{
        return cart.getProducts({where:{id:req.body.id}});
    }).then((products)=>{
        product = products[0];
        return product.cartItem.destroy();
    }).then(result => {
        res.redirect("/cart");
    }).catch((err)=> console.log(err)); 
}
exports.postOrderAdd = (req,res,next) => {
    let fetchedCart = null;
    req.user.getCart()
    .then(cart=>{
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return req.user.createOrder()
        .then( order => {
            return order.addProducts(
                products.map(product => {
                    product.orderItem = {qty: product.cartItem.qty};
                    return product;
                })
            );
        })
    }).then(result => {
        return fetchedCart.setProducts(null);
    }).then (result =>{
        res.redirect("/orders");
    })
    .catch((err)=> console.log(err));
}