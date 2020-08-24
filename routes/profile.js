const express = require('express');
const router = express.Router();
const db = require('../models')
const bodyParser = require('body-parser');

// router.get('/', (req, res) => {
//     let favSneaker = db.sneaker.findAll()
//     .then((fav) => {
//         res.render('profile', {fav})
//     })
// })

// router.post('/', (req, res) => {
//     db.sneaker.findOrCreate({
//         where: {styleID: req.body.id}
//     })
//     .then(function() {
//         res.redirect('/profile')
//     })
// })

// router.delete('/',  (req, res) => {
//     db.sneaker.destroy({
//       where: {name: req.body.id}
//       })
//       .then(function() {
//         res.redirect('/profile');
//       })
//   })

// router.post('/:id', (req, res) => {
//     sneaks.getProducts(req.body.id, function(err, products){
//         if(err) {
//             console.log(err)
//             res.render('notfound')
//         } else {
//             console.log(products)
//             res.render('discover/show', {products})
//         };
//     });
// });

module.exports = router;