// product.route.js
const express = require('express');
const path = require("path");

const ProductRoutes = express.Router();

// Require Product model in our routes module
let Product = require('./product.model');

// Defined store route
ProductRoutes.route('/create').post((req, res) => {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json(product);
        })
        .catch(err => {
            res.status(400).send(err);
            //res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
ProductRoutes.route('/').get((req, res) => {
    Product.find((err, products) => {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Defined get detail route
ProductRoutes.route('/show/:id').get((req, res) => {
    let id = req.params.id;
    Product.findById(id, (err, product) => {
        res.json(product);
    });
});


// Defined edit route
ProductRoutes.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    Product.findById(id, function (err, product) {
        res.json(product);
    });
});

//  Defined update route
ProductRoutes.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (!product)
            res.status(404).send("data is not found");
        else {
            product.product_client_code = req.body.product_client_code;
            product.product_title = req.body.product_title;
            product.product_brand = req.body.product_brand;
            product.product_model_number = req.body.product_model_number;
            product.product_dimensions = req.body.product_dimensions;
            product.product_weight = req.body.product_weight;
            product.product_quantity = req.body.product_quantity;
            product.product_category = req.body.product_category;
            product.product_condition = req.body.product_condition;
            product.product_SKU = req.body.product_SKU;
            product.product_images = req.body.product_images;
            product.product_description = req.body.product_description;
            product.product_location = req.body.product_location;
            product.product_reserve = req.body.product_reserve;
            product.product_selling_price = req.body.product_selling_price;
            product.product_listed_price = req.body.product_listed_price;
            product.product_steps_completed = req.body.product_steps_completed;
            product.product_status = req.body.product_status;

            product.save().then(product => {
                res.json(product);
            })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
    });
});

// Defined delete | remove | destroy route
ProductRoutes.route('/delete/:id').get((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        product.remove(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send('removed');
            }
        })
    });
});


module.exports = ProductRoutes;