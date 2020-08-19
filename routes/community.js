const express = require('express');
const router = express.Router();
const db = require('../models')
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const multer = require('multer');
const upload = multer({dest: '.uploads'});

router.post('/', upload.single('myFile'), (req, res) =>  {
  cloudinary.uploader.upload(req.file.path, (result) => {
    db.cloudpic.findOrCreate({
      where: {url: result.url}
    })
    .then(() => {
      res.redirect('community/communityPage')
    })
    .catch(err => {
      console.log(err);
    });
  });
});

router.get('/', (req, res) => {
  db.cloudpic.findAll()
  .then(myPics => {
    res.render('community/communityPage', {myPics})
  })
  .catch(err => {
    console.log(err);
  });
});

module.exports = router;