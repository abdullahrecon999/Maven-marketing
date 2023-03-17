var express = require('express');
const authController = require('../controller/authController');
var router = express.Router();
const crypto = require('crypto');
const passport = require('passport');
const bcrypt = require('bcryptjs');
var utils = require('../config/authUtils');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// importing the models
const User = require('../models/User');
const plateforms = require('../models/profiles');
const Campaings = require("../models/Campaign");
const bids = require("../models/Proposals")
const contracts = require("../models/Contracts")
const invites = require("../models/Invites")
const contacts = require("../models/MessageContacts")
const Contracts = require("../models/Contracts")
const ROLES = require('../utils/roles').ROLES;
const sendEmail = require('../utils/sendEmail');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Influencer Router called');
});

// get 5 influencers with only id, name, social media, photo, and banner photo using Influencer model
router.get("/topinfluencers", async(req, res, next)=>{
  try{
    const data = await User.find({role: "influencer"}).limit(5).select("name photo socialMediaHandles")
    res.status(200).json({
      status: "success",
      data
    })
  }catch(e){
    console.log(e)
    res.status(502).json({
      status: "error"
    })
  }
})

// geting a particular user
router.get("/:id", async (req, res, next) => {
    const id = req.params.id
    try{
      const user = User.find({_id: id})
      res.status(200).json({
        status : "success",
        data: {
          user
        }
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
            newUser.role = ROLES.Influencer;
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
    res.send('Influencer Login Now');
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

router.get('/dashboard', ensureAuthenticated, utils.checkIsInRole(ROLES.Influencer) ,(req, res, next) => {
    res.send('Influencer Dashboard');
})

// get all influencers
router.get('/all', async (req, res) => {
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
      status: 'fail',
      message: err
    });
  }
});

router.get("/profile/:id",async(req, res)=>{
  const id = req.params.id
  try{
    const data = await User.findOne({_id:id})
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
//email verification make it POST for rendering better pages from frontend
router.get('/verifyEmail/:token', async (req, res) => {
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

//profile completion
router.post('/completeProfile/:id',async (req, res, next) => {
  const id = req.params.id
  
  const user = await User.find({_id: id})
  try{
  await User.updateOne({_id: id}, req.body)

  res.status(200).json({
    status: "success"
  });
  }
  catch(e){
    console.log(e)
    res.status(500).json({
      status: "error"
    })
  }
  if (req.body.platform === "twitter"){
    data = {
      id: req.body.id,
      url: req.body.url
    }
    // send request to the verify the email
  }
})


router.post("/activateProfile/:id", async(req, res, next)=> { 
    const id = req.params.id
    try{
      await User.updateOne({_id: id}, req.body)
    
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

router.post("/deactivateProfile/:id", async(req, res, next)=> { 
  const id = req.params.id
  try{
    await User.updateOne({_id: id}, req.body)
  
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

router.post("/:id/addplatform",  async (req, res, next) =>{
  const id = req.params.id
  try{
    await plateforms.create(req.body)
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


router.put("/updateProfile/:id", async(req, res, next)=>{
  const id = req.params.id
  console.log(id)
  console.log(req.body)

  try{
    await User.updateOne({_id: id}, req.body)
    const data = await User.findOne({_id:id})
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
// campaign routes need to be test needs some refinement
router.get("/campaigns", async(req, res, next)=>{
  

  try{
    const data = await Campaings.find({}).populate("brand")
    console.log(data)
    res.status(200).json({
      status: "success",
      data
      
    }).sort({updatedAt:1})
  }catch(e){
    console.log(e)
    res.status(502).json({
      status: "erro"
    })
  }
})



router.get("/searchCampaign/:query", async(req, res, next)=>{
  
  const query = req.params.query

  try{
    const data = await Campaings.search(query)
    if(data?.length){
      res.status(200).json({
        status: "success",
        data
        
      })
    }
    else{
      res.status(404).json({
        status: "success",
        
        
      })
    }
    
  }catch(e){
    console.log(e)
    res.status(500).json({
      status: "error"
    })
  }
})

router.get("/myBids/:id", async(req, res)=>{
  const id= req.params.id
  try{
    const data = await bids.find({sender:id, accepted: false})
    .populate("to","name").populate("campaignId","title")
   
      res.status(200).json({
        status: "success",
        data
      })
    
    

  }catch(e){
    console.log(e)
    res.status(500).json({
      status: "error",
    })
  }
  
})

router.get("/bidDetails/:id", async(req, res, next)=>{
  const id = req.params.id
  try{
    const data = await bids.findOne({_id:id})
    .populate("to", "name")
    .populate("campaignId", "title")

    if(Object.keys(data).length !== 0){
      res.status(200).json({
        status: "successssssssss",
        data
        
      })
    }else{
      res.status(404).json({
        status: "error",
        msg: "no bids found"
        
      })

    }
    
  }catch(e){
    console.log(e)
    res.status(500).json({
      status: "error",
    })
    
  }
})

router.post("/bidCampaign/:id", async (req, res, next) => {
  const id = req.params.id
  
  try{
    bids.create(req.body)
    res.status(200).json({
      status: "success",
    })
    
  }catch(e){
    console.log(e)
    res.status(200).json({
      status: "error",
    })
  }

})
router.get("/getmyContracts/:id", async(req,res, next)=>{
      const id = req.params.id
      try{
        const data = await contracts.find({to: id, accepted:true}).populate("sender", "name").populate("campaignId")
        res.status(200).json({
          status: "success",
          data
        })
      }catch(e){
        console.log(e)
        res.status(500).json({
          status: "error",

        })
      }

})
// these routes need to be fixed also

router.get("/allContracts", async(req, res, next)=>{
  try{
    const data = contracts.find({})
    .populate("CampaignId")
    .populate("sender")

    if(data?.length){
      res.status(200).json({
        status: "success",
        data
        
      })
    }else{
      res.status(404).json({
        status: "success",
        
        
      })
    }
  }catch(e){
    res.status(404).json({
      status: "error", 
    })
  }
})

router.get("/contractDetails/:id", async (req, res)=>{
  try{
    const id = req.params.id
    const data = contracts.findOne({_id: id})
    .populate("CampaignId")
    .populate("sender")

    if(Object.keys(data)?.length){

      res.status(200).json({
        status: "success",
        data
        
      })
    }else{
      res.status(404).json({
        status: "success",
        
        
      })
    }


  }catch(e){
    res.status(404).json({
      status: "error", 
    })
  }
})



router.get("/getInvites/:id", async (req, res, next)=>{
   const id = req.params.id;
   try{
    const data = await invites.find({to: id})
    .populate("campaign")
    .populate("sender", "name")

    res.status(200).json(
      {status: "success",
      data
    }
    )

   }catch(e){
    console.log(e)
    res.status(500).json(
      {status:"error"}
    )

   }
})

router.post("/invite/accept/:id", async(req, res, next)=>{
  const id = req.params.id
  console.log("data    ",id)
  try{
    const data = await invites.findOne({_id: id})
    const val = {
      accepted: true
    }
    if(Object.keys(data).length !==0){
      await invites.updateOne({_id: id}, val)
      await contacts.updateOne({user: data["to"]},{$push: {contacts:[{contact: data["sender"]}]}})
      await contacts.updateOne({user: data["sender"]},{$push: {contacts:[{contact: data["to"]}]}})

      res.status(200).json({
        status: "success",
        msg: "accepted"
  
      })
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

router.get("/invites/detail/:id", async(req, res)=>{
  const id = req.params.id
  try{
    const data = await invites.findOne({_id: id}).populate("campaignId").populate("sender")
    res.status(200).json({
      status: "success",
      data
    })
  }catch(e){
    console.log(e)
    res.status(500).json({
      status: "error",

    })
  }
})

router.post("/invite/reject/:id", async(req, res, next)=>{
  const id = req.params.id
  try{
    const data = await invites.findOne({to: id})

    if(Object.keys(data).length !==0){
      await invites.updateOne({_id: id}, req.body)
      res.status(200).json({
        status: "success",
        msg: "an accepted"
  
      })
    }
    else{
      res.status(404).json({
        status: "not found"
        
      })
    }
  }
  catch(e){
    res.status(500).json({
      status: "error",
      msg: "an error occured"

    })
  }
})

router.post("/acceptcontract", ()=>{})

router.post("/rejectContract", ()=>{})



module.exports = router