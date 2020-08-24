const express = require('express');
const router = express.Router();
const db = require('../models')
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const multer = require('multer');
const upload = multer({dest: '.uploads'});

cloudinary.config(process.env.API_KEY)

router.get('/', (req, res) => {
  db.cloudpic.findAll()
  .then(myPics => {
    res.render('community/communityPage', {myPics})
  })
  .catch(err => {
    console.log(err)
  })
})

router.post('/', upload.single('myFile'), (req, res) =>  {
  cloudinary.uploader.upload(req.file.path, (result) => {
    db.cloudpic.findOrCreate({
      where: { 
        url: result.url
      }
    })
    .then(() => {
      res.redirect('/community')
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })
})

module.exports = router;