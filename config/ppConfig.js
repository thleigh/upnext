const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('../models');

/* Passport "serialize" your info make it easier to login
  - Convert the user based on the id
*/
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

// Passport "deserializeUser" is going to take the id and look that 
// up in the database
passport.deserializeUser((id, cb) => {
    // cb(null, id)
    // .catch(cb);

    db.user.findByPk(id)
    .then(user => {
        cb(null, user)
    }).catch(cb);

});

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {
    db.user.findOne({
        where: { email }
    })
    .then(user => {
        if (!user || !user.validPassword(password)) {
            cb(null, false);
        } else {
            cb(null, user);
        }
    })
    .catch(cb);
}));

module.exports = passport;

// passport.serializeUser((user, done) => {
//     // Call the callback function with the user id as an argument
//     // done(error, id) - pass a null if no error
//     done(null, user.id)
// })
// // DESERIALIZE: Reverse the process of the serialize function
// // In other words, take a user's ID and return the full user object
// passport.deserializeUser((id, done) => {
//     db.user.findByPk(id)
//     .then(user => {
//         done(null, user)
//     })
//     .catch(done)
// })