const express = require('express');
const router = express.Router();
const db = require('../models')
const bodyParser = require('body-parser');

// Sneaks API
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI();

// Gets the most popular shoes at the moment and displays them.
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

// // Gets the shoe's data when shoe is clicked
// router.get('/:shoeName', (req, res) => {
//     sneaks.getProducts(req.query.shoeName, function(err, products){
//         if(err) {
//             console.log(err)
//             res.send('Product Not Found')
//         } else {
//             res.render('discover/show', {products})
//         };
//     });
// });

module.exports = router;