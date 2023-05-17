var express = require('express');
const Transaction = require("../models/Transaction")
require('dotenv').config()
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
const invites = require ("../models/Invites");
const Account = require('../models/Account')
const { platform } = require('os');

const secretKey = process.env.STRIPE_KEY

const stripe = require('stripe')(secretKey)
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Brand Router called');
});

router.post("/getinvites/", async(req, res)=>{
  const {sender, campaignId} = req.body
  console.log(req.body)
  try{
    const data = await invites.find({campaignId:campaignId, sender:sender}).populate("to").populate("campaignId")
   
    res.status(200).json({
      status:"success",
      data
    })
  }catch(e){
    res.status(500).json({
      status: "error"
    })
  }
})
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
                await contacts.create({
                  user: user["_id"],
                  contacts: []
                })
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

// update profile using id from params and update only chnaged fields from req.body
router.patch('/update-profile/:id', async (req, res) => {
  console.log(req.body);
  try {
    const data = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
});

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

router.post('/campaigns/:id', (req, res) => {
  
  Campaign.find({_id:id, status: "live"}).then(campaigns => {
    res.send(campaigns);
  }).catch(err => {
    res.send("not Found");
  })
})

router.post("/createContract", async (req, res)=>{
    const data= req.body

    try{

    const contract =  await Contract.create(req.body)
    const campaign = await Campaign.findOne({_id:contract["campaignId"]}).populate("brand", "name")
    console.log(campaign)
     const msg = {
      text: `Contract Available for ${campaign["title"]} by ${campaign?.brand.name}`,
      users:[
        data["sender"].toString(),
        data["to"].toString()
      ],
      sender: data["sender"],
      msgType: "contract",
      contract: contract["_id"]
    }
    console.log(msg)
    await Message.create(msg)
    
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
    const data = await Bids.find({campaignId:id}).populate("campaignId").populate("sender", "name")
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

router.get("/inviteinfluencers", async(req,res)=>{
  try{
    const data= await User.find({role: "influencer"}).limit(5)
    res.status(200).json({
      status: "success",
      data
    })
  }catch(e){
    res.status(502).json({
      status: "error"
    })
  }
})

router.post("/sendinvite", async(req, res)=>{
  try{
    await invites.create(req.body)
    res.status(200).json({
      status: "success"
    })
  }catch(e){
    console.log(e)
    res.status(500).json({
      status: "error"
    })
  }
})

router.get("/getbiddetails/:id", async (req, res)=>{
  const id = req.params.id
  try{
    const data = await Bids.findOne({_id:id}).populate("sender").populate("campaignId")
    console.log(data)
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
      const campaign = await Campaign.findOne({_id: data["campaignId"]}).populate("brand", "name")
    const msg = {
    text: `Accepting the Proposal  for ${campaign["title"]} by ${campaign?.brand.name}`,
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

router.get("/getinvitedetails/:id", async (req, res)=>{
  const id = req.params.id
  try{
    const data = await invites.findOne({_id:id}).populate("sender").populate("campaignId")
    console.log(data)
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

router.get("/getcurrentworkinginfluencers/:id",async(req, res, next)=>{
  try{
    const id = req.params.id
    const data = await Contract.find({campaignId: id, accepted: true, expired:false}).populate("to")
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

router.get("/getcontractdetails/:id", async (req, res, next)=>{
  try{
    const id = req.params.id
    const data = await Contract.findOne({_id: id, accepted:true}).populate('campaignId').populate("to")
    res.status(200).json({
      status: "success",
      data
    })
  }catch (e){
    res.status(500).json({
      status: "error"
    })
  }
})
router.post("/endcontract/:id", async (req, res, next)=>{
  try{
    const id = req.params.id
    
    //add code here to pay the influencer
    const data = await Contract.findOne({_id:id})
    

    const brandAccount = await Account.findOne({userId:data.sender, role:"brand"})
    const influencerAccount = await Account.findOne({userId:data.to, role:"influencer"})
    console.log("this is the brand contract")
    const paymentMethods = await stripe.paymentMethods.list({
      customer: brandAccount.accountId,
      type: 'card',
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount*100,
      currency: 'usd',
     
      payment_method: paymentMethods?.data[0]?.id,
      off_session : true,
      confirm :true,
      customer : brandAccount.accountId,
      transfer_data: {
        destination: influencerAccount.accountId,
      },
    }
   
    )
    await Transaction.create({
      userFrom: brandAccount.userId,
      userTo: influencerAccount.userId,
      amount: data.amount,
      paymentFor:data._id

    })

    await Contract.updateOne({_id:id}, {expired: true})
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

module.exports = router;