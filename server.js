require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const SECRET_SESSION = process.env.SECRET_SESSION;
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({dest: '.uploads'});
const cloudinary = require('cloudinary');
const db = require('./models');
let methodOverride = require('method-override');

// require the authorization middleware at the top of the page
const isLoggedIn = require('./middleware/isLoggedIn');
// const { UUID } = require('sequelize/types');

cloudinary.config(process.env.API_KEY)
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride('_method'));

// secret: What we actually giving the user to use our site / session cookie
// resave: Save the session even if it's modified, make this false
// saveUninitialized: if we have a new session, we'll save it, therefore,
// setting this to true

app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

// Initialize passport and run session as middleware
app.use(passport.initialize());
app.use(passport.session());

// flash for temporary messages to the user
app.use(flash());

// middleware to have our message accessible for every view
app.use((req, res, next) => {
  // before every route, we will attached our current user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/profile', isLoggedIn, (req, res) => {

    db.sneaker.findAll()
  .then((fav) => {
    res.render('profile', {fav})
    })
    .catch((error) => {
      console.log(error)
    })
});

app.post('/profile', (req, res) => {
  db.sneaker.findOrCreate({
    include:[db.user],
    where: {
        styleID: req.body.id,
        thumbnail: req.body.thumbnail,
        shoeName: req.body.shoeName,
      }
  })
  .then(function() {
      res.redirect('/profile')
  })
  .catch((error) => {
    console.log(error)
  })
})

app.delete('/profile',  (req, res) => {
  db.sneaker.destroy({
    where: {styleID: req.body.id}
    })
    .then(function() {
      res.redirect('/profile');
    })
    .catch((error) => {
      console.log(error)
    })
})


app.use('/', require('./routes/index.js'))
app.use('/discover', require('./routes/discover'));
app.use('/community', require('./routes/community'));
app.use('/auth', require('./routes/auth'));
app.use(express.static('public'));
app.use(express.static('views'));
// app.use('/profile', require('./routes/profile'))

app.get('*', (req, res) => {
  res.render('404')
})

const SneaksAPI = require('./controllers/sneaks.controllers.js');
const server = require('http').createServer(app);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOLAB_JADE_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/sneakers', { useNewUrlParser: true })
        .then(connect => console.log('connected to mongodb..'))
        .catch(e => console.log('could not connect to mongodb', e))


module.exports = app;
module.exports = SneaksAPI;
