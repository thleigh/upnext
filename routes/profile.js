const express = require('express');
const router = express.Router();
const db = require('../models')
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
    let favSneaker = db.sneaker.findAll()
    .then((fav) => {
        res.render('profile', {sneaker:fav})
    })
})

router.post('/', (req, res) => {
    db.sneaker.findOrCreate({
        where: {styleID: req.body.id}
    })
    .then(function() {
        res.redirect('/profile')
    })
})

module.exports = router;