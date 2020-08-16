const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

router.get('/', (req, res) => {
    sneaks.getProducts("Yeezy Cinder", function(err, products){
        console.log(products)
        res.render('discover', {products})
      })
})

router.post('/', (req, res) => {

})


  