const express = require('express');
const router = express.Router();
const db = require('../models')
const bodyParser = require('body-parser');

// Sneaks API
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI();

router.get('/', (req, res) => {
    sneaks.getMostPopular(function (err, products) {
        if (err) {
            console.log(err)
            res.send('No Products in Database')
        } else {
            res.render('discover/discover', {products})
        }
    })
})

// Gets the shoe that is searched by the shoe's name.
router.get('/:shoe', (req, res) => {
    sneaks.getProducts(req.query.shoe, function(err, products){
        console.log(products)
        if(err) {
            console.log(err)
            res.send('Product Not Found')
        } else {
            res.render('discover/discover', {products})
        };
    });
});

module.exports = router;