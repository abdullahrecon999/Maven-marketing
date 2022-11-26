const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config()
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// Load User model
const User = require('../models/User');
const Token = require('../models/Token');

module.exports = function(passport) {

  passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_SSO_CLIENT_ID,
    clientSecret : process.env.GOOGLE_SSO_CLIENT_SECRET,
    callbackURL : 'http://localhost:5000/users/auth/google/callback',
    passReqToCallback : true
  },
  function(request, accessToken, refreshToken, profile, done) {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function() {

        // try to find the user based on their google id
        User.findOne({ 'google.id' : profile.id }, function(err, user) {
            if (err)
                return done(err);

            if (user) {

                // if a user is found, log them in
                return done(null, user);
            } else {
                // if the user isnt in our database, create a new user
                var newUser = new User();
                console.log(profile);
                // set all of the relevant information
                newUser.google.id    = profile.id;
                newUser.google.token = token;
                newUser.google.name  = profile.displayName;
                newUser.google.email = profile.emails[0].value; // pull the first email

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    });

  }));

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, async (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            // return done(null, user);
            // Verify email token

            if (!user.isVerified) {
              let token = await Token.findOne({userId: user._id});
              if (!token) {
                token = await new Token({
                  userId: user._id,
                  token: crypto.randomBytes(32).toString('hex')
                }).save()
                const url = `${process.env.BASE_URL}/users/${user._id}/confirmation/${token.token}`
                await sendEmail(user.email, "Verify Email", url);
              } else{
                console.log('Email not verified');
              }
            } else {
              return done(null, user);
            }

          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
        
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
