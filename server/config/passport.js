const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var YoutubeV3Strategy = require('passport-youtube-v3').Strategy
var TiktokStrategy = require('passport-tiktok-auth').Strategy;
var InstagramStrategy = require('passport-instagram-graph').Strategy;
var PinterestStrategy = require('passport-pinterest').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').config()
const User = require('../models/User');
const Social = require('../models/Social');
const { Console } = require('console');

module.exports = function(passport) {

  passport.use(new FacebookStrategy({
    clientID: "2655457251257455",
    clientSecret: "b6e897dfae04d109e48340ab090aa9bd",
    callbackURL: "https://localhost/users/facebook/callback",
    // profileFields: ['id', 'displayName', 'photos', 'email'],
    scope: ['email'],
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        console.log("Access: ", accessToken)
        console.log(profile)
        return done(null, profile);
      });
    }
  ));
  
  passport.use(new PinterestStrategy({
    clientID: "1486333",
    clientSecret: "f0c60e253b4ec9a81c4798772d30b161cd1b60ad",
    callbackURL: "https://localhost:3000/users/pinterest/callback",
    scope: ['user_accounts:read'],
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log("Access: ", accessToken)
      console.log(profile)
      return done(null, profile);
    });
  }
));

  passport.use(new InstagramStrategy({
    clientID: "260983243038733",
    clientSecret: "552efe79cc45023aa5c058386a4c3c98",
    callbackURL: "https://127.0.0.1:3000/users/instagram/callback",
    scope: ['user_profile', 'user_media', 'instagram_graph_user_profile'],
    accessType: 'offline',
    state: true,
    passReqToCallback: true,
    session: false, 
    forceLogin: true, 
    prompt: 'login'
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log("Access: ", accessToken)
      console.log("Refresh: ", refreshToken)
      console.log(profile)

      // Create a new Social account if not exists else create one
      Social.findOne({ userid: request.session.user }).then((social) => {
        if (social) {
          // Update
          social.accessToken = accessToken;
          social.refreshToken = refreshToken;
          social.save();
        } else {
          const newSocial = new Social({
            platform: "instagram",
            userid: request.session.user,
            handle: profile.id,
            username: profile.username,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
          newSocial.save();
          // add this to user's socials array
          User.findOneAndUpdate({ _id: request.session.user }, { $push: { socialMediaAccounts: newSocial._id } }).then(user => {
            console.log("User: ", user)
          })
        }
      });
      
      return done(null, profile);
    });
  }
));

  passport.use(new TiktokStrategy({
    clientID: "awz01cdwsh937e5m",
    clientSecret: "e330f88d682cd15abe77ad9589f7dbf2",
    scope: ['user.info.basic', 'video.upload'],
    callbackURL: "http://127.0.0.1",
    state: true,
    passReqToCallback: true,
    session: false, 
    forceLogin: true, 
    prompt: 'login'
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log("Access: ", accessToken)
      console.log("Refresh: ", refreshToken)
      console.log(profile)
      console.log("Profile: ", profile._json)

      // Create a new Social account if not exists else create one
      Social.findOne({ userid: request.session.user }).then(async social => {
        console.log("social", social)
        if (social) {
          // update the access token value and save them
          social.accessToken = accessToken;
          social.refreshToken = refreshToken;
          social.save();
        } else {
          const newSocial = new Social({
            platform: "tiktok",
            userid: request.session.user,
            handle: profile.id,
            username: profile.username,
            accessToken: accessToken,
            refreshToken: refreshToken,
            profilePic: profile._json.data.user.avatar_large_url,
          });
          newSocial.save();
          // add this to user's socials array
          User.findOneAndUpdate({ _id: request.session.user }, { $push: { socialMediaAccounts: newSocial._id } }).then(user => {
            console.log("user", user)
          });
        }
      });

      return done(null, profile);
    });
  }
  ));
  
  passport.use(new YoutubeV3Strategy({
    clientID: "865935877068-r5odj728n08546l2qdg8mme3nvhpqmrd.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://127.0.0.1:3000/users/youtube/callback",
    scope: ['https://www.googleapis.com/auth/youtube.readonly', 'https://www.googleapis.com/auth/youtube.upload'],
    accessType: 'offline',
    state: true,
    passReqToCallback: true,
    session: false, 
    forceLogin: true, 
    prompt: 'login'
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log("Access: ", accessToken)
      console.log("Refresh: ", refreshToken)
      console.log(profile)
      console.log("Profile: ", profile._json.items)
      console.log("Profile: ", profile._json.items[0].snippet.thumbnails)

      // Create a new Social account if not exists else create one
      Social.findOne({ userid: request.session.user }).then(async social => {
        console.log("social", social)
        if (social) {
          // update the access token value and save them
          social.accessToken = accessToken;
          social.refreshToken = refreshToken;
          social.save();
        } else {
          const newSocial = new Social({
            platform: "youtube",
            userid: request.session.user,
            handle: profile.id,
            username: profile._json.items[0].snippet.customUrl,
            accessToken: accessToken,
            refreshToken: refreshToken,
            profilePic: profile._json.items[0].snippet.thumbnails.high.url,
          });
          newSocial.save();
          // add this to user's socials array
          User.findOneAndUpdate({ _id: request.session.user }, { $push: { socialMediaAccounts: newSocial._id } }).then(user => {
            console.log("user", user)
          });
        }
      });

      return done(null, profile);
    });
  }
  ));

  passport.use(new LinkedInStrategy({
    clientID: "77oyqfmbrr2780",
    clientSecret: "7VhpJoOGUOjz6TdS",
    callbackURL: "http://127.0.0.1:3000/users/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social'],
    state: true,
    passReqToCallback: true,
    session: false, 
    forceLogin: true, 
    prompt: 'login'
  }, function(request, accessToken, refreshToken ,profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // access passport.user from request
      console.log("request:", request.session.user)
      console.log("profile", profile)
      console.log("accessToken", accessToken)

      // Create a new Social account if not exists else create one
      Social.findOne({ userid: request.session.user, platform: 'linkedin' }).then(async social => {
        console.log("social", social)
        if (social) {
          // update the access token value and save them
          social.accessToken = accessToken;
          social.refreshToken = refreshToken;
          social.save();
        } else {
          const newSocial = new Social({
            platform: "linkedin",
            userid: request.session.user,
            handle: profile.id,
            username: profile.displayName,
            accessToken: accessToken,
            refreshToken: refreshToken,
            profilePic: profile.photos[3].value
          });
          await newSocial.save().then(social => {
            console.log("[+] Success: ", social)
          });
          // add this to user's socials array
          User.findOneAndUpdate({ _id: request.session.user }, { $push: { socialMediaAccounts: newSocial._id } }).then(user => {
            console.log("user", user)
          });

        }});

      return done(null, Social);
    });
  }));

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
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser', id)
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
