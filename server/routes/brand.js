var express = require('express');
const authController = require('../controller/authController');
var router = express.Router();
const crypto = require('crypto');
const passport = require('passport');
const bcrypt = require('bcryptjs');
var utils = require('../config/authUtils');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Campaign = require('../models/Campaign');
const Contract = require("../models/Contracts");
const Bids = require("../models/Proposals")
const contacts = require("../models/MessageContacts")
const Message = require("../models/MessageSchema")
const ROLES = require('../utils/roles').ROLES;
const sendEmail = require('../utils/sendEmail');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Brand Router called');
});

// Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
   else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ status:'error' , message: 'Email already exists' });
        res.send({ status:'error' , message: 'Email already exists' });
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
            newUser.role = ROLES.Brand;
            newUser
              .save()
              .then(async user => {
                //res.send(user)
                //res.redirect('/admin/login');

                console.log('Here user: ', user);

                // Not working
                // send email verification link
                const verifyEmailToken = user.createEmailVerificationToken();
                await user.save({ validateBeforeSave: false });
                console.log('Here verifyEmailToken: ', verifyEmailToken);
                console.log('Here user: ', user);
                const verifyEmailUrl = `${req.protocol}://${req.get('host')}/influencer/verifyEmail/${verifyEmailToken}`;
                const message = `Please verify your email Maven Marketing`;
                try {
                  await sendEmail(user.email, message, verifyEmailUrl);
                  res.status(200).json({
                    status: 'success',
                    message: 'Email verification link sent to email'
                  });
                } catch (err) {
                  user.emailVerificationToken = undefined;
                  user.emailVerificationExpires = undefined;
                  await user.save({ validateBeforeSave: false });
                  res.status(500).json({ status: 'error', message: err.message });
                }
                //res.send(user)
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

router.get('/login', (req, res, next) => {
    res.send('Brand Login Now');
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

router.get('/dashboard', ensureAuthenticated, utils.checkIsInRole(ROLES.Brand) ,(req, res, next) => {
    res.send('Brand Dashboard');
})

// get all users of brand role
router.get('/all', async (req, res) => {
  try {
    const users = await User.find({ role: ROLES.Brand });
    res.status(200).json({
      status: 'success',
      data: {
        users
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
});

//email verification
router.post('/verifyEmail/:token', async (req, res) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
    const user = await User.findOne({ emailVerificationToken : hashedToken, emailVerificationExpires: { $gt: Date.now() } });
    
    if (!user) {
      return res.status(400).send("user with given token doesn't exist");
    }

    user.email_verified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.status(200).send("Email verification Successful");
  } catch (error) {
    console.log(error);
  }
});

//forgot password
router.post('/password-reset', authController.PasswordReset);

// reset password
router.post('/resetPassword/:token', authController.PasswordResetVerify);

//create campaign
router.post('/create-campaign', async (req, res) => {
  const { title, email, description, country, language, platform } = req.body;
  console.log(req.body)

  try{
    Campaign.create(req.body)

    res.status(200).json({
      status: "success"
    })
  }catch(e){
    res.status(500).json({
      status: "error"
    })
  }

  // const newCampaign = new Campaign({
  //   title, email, description, country, language, platform
  // });

  

  // newCampaign.save().then(campaign => {
  //   res.send(campaign);
  // }).catch(err => {
  //   res.send(err);
  // });

});

router.post('/campaigns', (req, res) => {
  Campaign.find({email: req.body.email}).then(campaigns => {
    res.send(campaigns);
  }).catch(err => {
    res.send("not Found");
  })
})

router.post("/createContract", async (req, res)=>{
    const data= req.body

    try{

    const contract =  await Contract.create(req.body)
     const msg = {
      text: "Contract available",
      users:[
        data["sender"].toString(),
        data["to"].toString()
      ],
      sender: data["sender"],
      msgType: "contract",
      contract: contract["_id"]
    }
    await Message.create(msg)
    console.log(msg)
      res.status(200).json({
        status: "success"
      })

    }catch(e){
      res.status(500).json({
        status: "error"
      })
    }
  
})

router.get("/getallbids/:id", async (req, res)=>{
  const id = req.params.id
  try{
    const data = await Bids.find({campaignId:id, accepted:false}).populate("campaignId", "title").populate("sender", "name")
    console.log(data)
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

router.get("/getbiddetails/:id", async (req, res)=>{
  const id = req.params.id
  try{
    const data = await Bids.findOne({_id:id}).populate("sender").populate("campaignId")
    res.status(200).json({
      status: "success",
      data
    })
  }catch(e){
    console.log(e)
    res.status(500).json({
      status: "error"
    })
  }
})


router.post("/bid/accept/:id", async(req, res, next)=>{
  const id = req.params.id
  
  try{
    const data = await Bids.findOne({_id: id})
    const val = {
      accepted: true
    }
    if(Object.keys(data).length !==0){

      await Bids.updateOne({_id: id}, val)

    const msg = {
    text: "Accepting the bid",
    users:[
      data["sender"].toString(),
      data["to"].toString()
    ],
    sender: data["to"]
  }

  console.log("to",data["to"])
  console.log("sender", data["sender"])
    await Message.create(msg)
      
     const hasUser= await contacts.find({user:data["to"], "contacts.contact":data["sender"]})
     
     if(hasUser?.length){
      console.log("hase user", hasUser)
      res.status(200).json({
        status: "success",
        msg: "accepted"
  
      })
     }
     else{
      console.log("haree user", hasUser)
      await contacts.updateOne({user: data["to"]},{$push: {contacts:[{contact: data["sender"]}]}})
      await contacts.updateOne({user: data["sender"]},{$push: {contacts:[{contact: data["to"]}]}})
      res.status(200).json({
        status: "success",
        msg: "accepted"
  
      })
     }
      
      
    
    }
    else{
      res.status(404).json({
        status: "not found"

      })
    }
  }
  catch(e){
    console.log(e)
    res.status(500).json({
      status: "error",
      msg: "an error occured"

    })
  }
})


router.get("/getacceptedbids/:id", async (req, res)=>{
  const id = req.params.id
  try{
    const data = await Bids.find({campaignId:id, accepted:true}).populate("campaignId", "title").populate("sender", ["name", "photo"])
    console.log(data)
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

module.exports = router;