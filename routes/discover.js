const express = require('express');
const router = express.Router();

// Sneaks API
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI();

router.get('/', (req, res) => {
    res.render('discover')
})

router.post('/:id', (req, res) => {
    let shoe = req.body.search
        sneaks.getProducts(shoe, function(err, products){
            console.log(products)
            res.render('discoverSearch', {products})
        })
})

// router.post('/:id', (req, res) => {
//     let shoe = req.params.name
//     sneaks.getProducts(shoe, function(err, products){
//       res.redirect(`/discover/${req.params.name}`)
//     })
// })

module.exports = router;