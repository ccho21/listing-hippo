// product.route.js
const express = require('express');
const path = require("path");

const ProductRoutes = express.Router();

// Require Product model in our routes module
let Product = require('./product.model');

// Defined store route
ProductRoutes.route('/create').post((req, res) => {
    console.log(req.body);
    let product = new Product(req.body);
        product.save()
            .then(product => {
                 res.status(200).json({'product': 'product in added successfully'});
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
            product.person_name = req.body.person_name;
            product.business_name = req.body.business_name;
            product.business_gst_number = req.body.business_gst_number;

            product.save().then(business => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
ProductRoutes.route('/delete/:id').get((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        product.remove(err => {
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send('removed');
            }
        })
    });
});


module.exports = ProductRoutes;