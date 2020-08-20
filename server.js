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
const multer = require('multer')
const upload = multer({dest: '.uploads'})
const cloudinary = require('cloudinary')
const db = require('./models')

// Sneaks API
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI();
// require('./routes/sneaks.routes.js')(app);

// require the authorization middleware at the top of the page
const isLoggedIn = require('./middleware/isLoggedIn');

cloudinary.config(process.env.API_KEY)
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

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

app.get('/', (req, res) => {
  res.render('index', {alerts: res.locals.alerts});
});

app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

app.use('/discover', require('./routes/discover'));
app.use('/community', require('./routes/community'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'))

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;