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



router.get('/dashboard', ensureAuthenticated, utils.checkIsInRole(ROLES.Admin) ,async (req, res, next) => {
  try{
    const data =await User.aggregate([
      {
        $group:{
          _id: '$role',
          count: {
            $sum: 1
          }
        }
      }
    ])

    const NumberActivationRequests = await User.count({role: "influencer", profileActive: 0})
    const users =await User.find({role:"influencer", profileActive: 0})
    .select({ "_id": 1,"name": 1, "platforms": 1, "profileActive": 1, "country":1 })
    
    const val = {
      total: data[1].count + data[2].count,
      activationRequests: NumberActivationRequests,
      influencers: data[1].count,
      brands: data[2].count,
      
      
    }
    console.log(users)
    res.status(200).json({

      status: "success",
      
        val,
        users
      
    })

  }catch(e){
    res.status(200).json({
      status: "error",
      msg: "something went wrong"
    })
  }
    
})

//get inactive profiles
router.get("/getInactiveProfiles", ensureAuthenticated, utils.checkIsInRole(ROLES.Admin) ,async (req, res, next)=>{
    try{
      const data =await User.find({role:"influencer", profileActive: 0})
      .select({ "_id": 1,"name": 1, "platforms": 1, "profileActive": 1, "country":1 })
      console.log(data)
      res.status(200).json(
        {status: "success",
        data
      }
      )
    }catch(e){
      console.log(e)
    }

})

router.get('/getInfluencers', async (req, res) => {
  try {
    const users = await User.find({ role: "influencer" });
    res.status(200).json({
      status: 'success',
      data: {
        users
      }
    });
  } catch (err) {
    console.log(err)
    res.status(404).json({
      status: 'error',
      message: err
    });
  }
});

//get the userProfile

router.get("/influencer/:id", ensureAuthenticated, utils.checkIsInRole(ROLES.Admin) , async(req, res, next)=>{
  const id = req.params.id
  try{
    const data = await User.findOne({_id: id})
    res.status(200).json({
      status: "success",
      data
    })
  }catch(e){
    res.status(500).json({
      status: "error"
    })
  }
})

//activating the profile of influencer

router.post("/activateProfile/:id", async(req, res, next)=> { 
  const id = req.params.id
  try{
    await User.updateOne({_id: id}, {profileActive:1})
  
    res.status(200).json({
      status: "success"
    });
    }
    catch(e){
      res.status(500).json({
        status: "error"
      })
    }
})
//forgot password
router.post('/password-reset', authController.PasswordReset);

// reset password
router.post('/resetPassword/:token', authController.PasswordResetVerify);

module.exports = router;
