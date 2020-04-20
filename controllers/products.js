const Product = require("../models/product");

exports.getProductAdd = (req,res,next) => {
    console.log("Add Product form");
    res.render("admin/product-edit", {title: "Add Product",path:"admin/product-add", verb: "add", product: {}});
}

exports.postProductAdd = (req,res,next) => {
    console.log("adding product");

    req.user.createProduct({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price
    }).then(() => {
        res.redirect("/admin/products");
    }).catch(err => console.log(err));
}

exports.getProductUpdate = (req,res,next) => {
    console.log("Update Product form");
    const editMode = req.query.edit;
    if(!editMode) { res.redirect("/");}
    const productId = req.params.productId;
    req.user.getProducts({where:{id:productId}}).then(products=>{
        product = products[0];
        if(!product) res.redirect("/");
        res.render("admin/product-edit", {title: "Update Product",path:"admin/product-edit", verb: "edit", product: product});

    }).catch(err => console.log(err));
}

exports.postProductUpdate = (req,res,next) => {
    console.log("update product");
    Product.findByPk(req.body.id).then((product)=> {
        product.title = req.body.title;
        product.description = req.body.description;
        product.imageUrl = req.body.imageUrl;
        product.price = req.body.price;
        return product.save();
    }).then((product)=>{
        console.log(product);
        res.redirect("/admin/products");
    }).catch(err => console.log(err));
}

exports.postProductDelete = (req,res,next) => {
    console.log("delete product");
    Product.findByPk(req.body.id).then(product=>{
        return product.destroy();
    }).then(result => {
        console.log("Product destroyed");
        res.redirect("/admin/products");
    }).catch((err)=> console.log(err)); 
}

exports.getProducts = (req,res,next) => {
    console.log("This is the products page.");
    Product.findAll().then(products => {
        res.render("shop/product-list",{title: "All Products", products: products,path:"/products"});
    }).catch((err)=> console.log(err)); 
}
exports.getProductDetails = (req,res,next) => {
    console.log("This is the product details page.");
    const pId = req.params.productId;
    Product.findByPk(pId).then(product => {
        res.render("shop/product-details",{title: product.title, product: product,path:"/products"});
    });
}
exports.getAdminProducts = (req,res,next) => {
    console.log("This is the admin products page.");
    req.user.getProducts().then((products) => {
        res.render("admin/products",{title: "All Products", products: products,path:"admin/products"});
    }).catch(err => console.log(err));
}