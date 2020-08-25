const express = require('express');
const router = express.Router();
const db = require('../models')
const bodyParser = require('body-parser');

// Sneaks API
const SneaksAPI = require('../controllers/sneaks.controllers');
const sneaks = new SneaksAPI();

// Gets the most popular shoes at the moment and displays them.
router.get('/', (req, res) => {
    sneaks.getMostPopular(function (err, products) {
        if (err) {
            console.log(err)
            res.send('No Products in Database')
        } else {
            res.render('discover/discover', {products: products.slice(0,12)})
        }
    })
})

// Gets the shoe that is searched by the shoe's name.
router.get('/:shoe', (req, res) => {
    sneaks.getProducts(req.query.shoe, function(err, products){
        // console.log(products)
        if(err) {
            console.log(err)
            res.render('notfound')
        } else {
            res.render('discover/discover', {products})
        };
    });
});

// Gets the shoe's data when shoe is clicked by using the shoeID
router.post('/:id', (req, res) => {
    sneaks.getProducts(req.body.id, function(err, products){
        if(err) {
            console.log(err)
            res.render('notfound')
        } else {
            console.log(products)
            res.render('discover/show', {products})
        };
    })  
    .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
});

module.exports = router;