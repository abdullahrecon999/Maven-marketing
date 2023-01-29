var express = require('express');
const crypto = require('crypto');
const authController = require('../controller/authController');
var router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
var utils = require('../config/authUtils');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const ROLES = require('../utils/roles').ROLES;
const sendEmail = require('../utils/sendEmail');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Admin Router called');
});

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
     else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.send(errors);
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
                  res.send(user)
                  //res.redirect('/admin/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

router.get('/login', (req, res, next) => {
    res.send('Login Now');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.status(info.status).send({ success : false, message : info.message });
    }

    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.status(info.status).send({ success : true, message : info.message, user: user });
    });      
  })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).send('Logout Success');
});

router.get('/dashboard', ensureAuthenticated, utils.checkIsInRole(ROLES.Admin) ,(req, res, next) => {
    res.send('Admin Dashboard');
})

//forgot password
router.post('/password-reset', authController.PasswordReset);

// reset password
router.post('/resetPassword/:token', authController.PasswordResetVerify);

module.exports = router;
