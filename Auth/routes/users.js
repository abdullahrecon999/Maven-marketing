const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('dotenv').config()
const crypto = require('crypto');

// Load User model
const User = require('../models/User');
// Load Token model
const Token = require('../models/Token');
const { forwardAuthenticated } = require('../config/auth');
const sendEmail = require('../utils/sendEmail');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(async user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                //res.redirect('/users/login');
                // send email
                const token = await new Token({
                  userId: user._id,
                  token: crypto.randomBytes(32).toString('hex')
                }).save()

                const url = `${process.env.BASE_URL}users/${user._id}/confirmation/${token.token}`
                await sendEmail(user.email, "Verify Email", url);
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
  passport.authenticate('google', {
        successRedirect : '/dashboard',
        failureRedirect : '/users/login'
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

// Verify Email
router.get('/:userId/confirmation/:token', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
    if (!user) {
      return res.status(404).send('Link not found')
    }

    const token = await Token.findOne({ userId:user._id, token: req.params.token })
    if (!token) {
      return res.status(404).send('Link not found')
    }

    await User.findOneAndUpdate({ _id: user._id }, { isVerified: true }, {upsert: true})
    await Token.remove({ userId: user._id });

    res.status(200).send('Email verified successfully')
  } catch (error) {
    
  }
})

// Forgot Password
router.post('/password-reset', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    console.log(user._id)

    if (!user) {
      return res.status(400).send("user with given email doesn't exist");
    }

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
        token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
    }

    const link = `${process.env.BASE_URL}users/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.send("password reset link sent to your email account");

  } catch (error) {
    console.log(error);
  }
})

router.post('/:userId/:token', async (req, res) => {
  try {

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    Newpassword = req.body.password;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(Newpassword, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user
          .save()
          .then(async user => {
            req.flash(
              'success_msg',
              'Password Updated'
            );
          })
          .catch(err => console.log(err));
      });
    });

    console.log(req.body.password);
    //await user.save();
    await token.delete();

    res.send("password reset sucessfully.");
  } catch (error) {
      res.send("An error occured");
      console.log(error);
  }
})

module.exports = router;
