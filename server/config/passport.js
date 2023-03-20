const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config()
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// Load User model
const User = require('../models/User');
// const Token = require('../models/Token');
const { Console } = require('console');

module.exports = function(passport) {

  passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_SSO_CLIENT_ID,
    clientSecret : process.env.GOOGLE_SSO_CLIENT_SECRET,
    callbackURL : 'http://localhost:3000/users/auth/google/callback',
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOne won't fire until we have all our data back from Google
    //done(null, profile);
    process.nextTick(function() {

      console.log(profile)
        // try to find the user based on their google id
        User.findOne({ email: profile.emails[0].value }).then(async user => {

            if (user) {
                // if a user is found, log them in
                user.email_verified = true;
                await user.save({ validateBeforeSave: false });
                
                return done(null, user, { message: 'Login successful', status: 200 });
            } else {
                // if the user isnt in our database, redirect them to register page
                return done(null, false, { message: 'Email not registered', status: 401 });
            }
        }).catch(err => { console.log(err); return done(err); });
    });

  }));

  passport.use(
    new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
      
      console.log('req', req.body); // get user role from req.body
      
      // Match user
      User.findOne({
        email: email
      }).then(async user => {
        if (!user) {
          console.log('That email is not registered');
          return done(null, false, { message: 'That email is not registered', status: 401 });
        }
        console.log('user', user);
        // Match password

        // console.log('password', password)
        // console.log('user password', user.password)
        // console.log('user correctPassword', await user.correctPassword(password, user.password))
        // console.log('crypt pass', await bcrypt.hash(password, 12))

        if(user.role !== req.body.role){
          console.log('Role incorrect');
          return done(null, false, { message: 'Unauthorized Role', status: 401 });
        }

        if(!(await user.correctPassword(password, user.password))){
          console.log('Password incorrect');
          return done(null, false, { message: 'Password incorrect', status: 401 });
        } else {
          console.log('Password correct');
          // check if email is verified, if not and no token exists, send verification email else return false
          if(!user.email_verified){
            if(!user.emailVerificationToken){
              // create and send another token
              const token = user.createEmailVerificationToken();
              await user.save({ validateBeforeSave: false });
          
              // send to user's email
              console.log('user', user);
              try {
                const link = `${req.protocol}://${req.get('host')}/${user.role}/verifyEmail/${token}`;
                await sendEmail(user.email, "Email Verify from passport", link);
          
                return done(null, false, { message: 'Email not verified, please check your email', status: 401 });
              } catch (err) {
                console.log(err)
                user.emailVerificationToken = undefined;
                user.emailVerificationExpires = undefined;
                await user.save({ validateBeforeSave: false });
          
                return done(null, false, { message: 'There was an error sending the email', status: 500 });
              }
            } else {
              return done(null, false, { message: 'Email not verified, please check your email', status: 401 });
            }
          }

          return done(null, user, { message: 'Authentication Success', status: 200 });
        }

      });
    })
  );

  passport.serializeUser(function(user, done) {
    console.log('serializeUser', user)
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
