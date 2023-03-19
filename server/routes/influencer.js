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

const Message = require("../models/MessageSchema")
const ROLES = require('../utils/roles').ROLES;
const sendEmail = require('../utils/sendEmail');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Influencer Router called');
});

// get 5 influencers with only id, name, social media, photo, and banner photo using Influencer model
router.get("/topinfluencers", async(req, res, next)=>{
  try{
    const data = await User.find({role: "influencer"}).limit(5).select("name photo socialMediaHandles description")
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

// get all influencers using Influencer model name, photo, country, category, description, socialMediaHandels, language and registered
router.get("/allinfluencers", async(req, res, next)=>{
  try{
    const data = await User.find({role: "influencer"}).select("name photo country category description socialMediaHandles language registered")
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

// get influencers and add filter, search and sort and use mongoose-paginate-v2 for pagination for role influencer
router.get("/influencers", async(req, res, next)=>{
  try{
    const {page, limit, search, sort, category, country, language, socialMediaHandles, minFollowers, maxFollowers} = req.query
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: {},
      collation: {
        locale: 'en'
      }
    }
    if (sort) {
      const sortingFields = sort.split(',')
      sortingFields.forEach(field => {
        const sortingField = field.split(':')
        if (sortingField[0] === 'followers') {
          options.sort[`socialMediaHandles.${sortingField[0]}`] = sortingField[1] === 'asc' ? 1 : -1
        } else {
          options.sort[sortingField[0]] = sortingField[1] === 'asc' ? 1 : -1
        }
      })
    } else {
      options.sort = {
        'socialMediaHandles.follower': -1,
        createdAt: -1
      }
    }
    const query = {}
    if(search){
      query.$and = [
        {
          $or: [
            {name: {$regex: search, $options: 'i'}},
            {description: {$regex: search, $options: 'i'}}
          ]
        }
      ]
    }
    if(category){
      const categories = category.split(',')
      query.category = { $in: categories.map(c => new RegExp(c, 'i')) }
    }
    if(country){
      const countries = country.split(',')
      query.country = { $all: countries.map(c => new RegExp(c, 'i')) }
    }
    if(language){
      query.language = language
    }
    if(socialMediaHandles){
      query.socialMediaHandles = {
        $elemMatch: {
          platform: socialMediaHandles,
          followers: {
            $exists: true
          }
        }
      }
    }
    if (minFollowers && maxFollowers) {
      query.socialMediaHandles = {$elemMatch: {followers: {$gte: minFollowers, $lte: maxFollowers}}}
    } else if (minFollowers) {
      query.socialMediaHandles = {$elemMatch: {followers: {$gte: minFollowers}}}
    } else if (maxFollowers) {
      query.socialMediaHandles = {$elemMatch: {followers: {$lte: maxFollowers}}}
    }
    const data = await User.paginate({role: "influencer", ...query}, options)
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


// router.get("/influencers", async(req, res, next)=>{
//   try{
//     const {page, limit, search, sort, category, country, language, socialMediaHandles} = req.query
//     const options = {
//       page: parseInt(page, 10) || 1,
//       limit: parseInt(limit, 10) || 10,
//       sort: {},
//       collation: {
//         locale: 'en'
//       }
//     }
//     if (sort) {
//       const sortingField = sort.split(':')
//       options.sort[sortingField[0]] = sortingField[1] === 'asc' ? 1 : -1
//     } else {
//       options.sort = {
//         registered: -1
//       }
//     }
//     const query = {}
//     if(search){
//       query.$or = [
//         {name: {$regex: search, $options: 'i'}},
//         {description: {$regex: search, $options: 'i'}},
//         {category: {$regex: search, $options: 'i'}},
//         {country: {$regex: search, $options: 'i'}},
//         {language: {$regex: search, $options: 'i'}},
//         {socialMediaHandles: {$regex: search, $options: 'i'}},
//       ]
//     }
//     if(category){
//       query.category = category
//     }
//     if(country){
//       query.country = country
//     }
//     if(language){
//       query.language = language
//     }
//     if(socialMediaHandles){
//       query.socialMediaHandles = socialMediaHandles
//     }
//     const data = await User.paginate({role: "influencer", ...query}, options)
//     res.status(200).json({
//       status: "success",
//       data
//     })
//   }catch(e){
//     console.log(e)
//     res.status(502).json({
//       status: "error"
//     })
//   }
// })



// router.get("/influencers", async(req, res, next)=>{
//   try{
//     const {page, limit, search, sort, category, country, language, socialMediaHandles} = req.query
//     const options = {
//       page: parseInt(page, 10) || 1,
//       limit: parseInt(limit, 10) || 10,
//       sort: {
//         registered: -1
//       },
//       collation: {
//         locale: 'en'
//       }
//     }
//     const query = {}
//     if(search){
//       query.$or = [
//         {name: {$regex: search, $options: 'i'}},
//         {description: {$regex: search, $options: 'i'}},
//         {category: {$regex: search, $options: 'i'}},
//         {country: {$regex: search, $options: 'i'}},
//         {language: {$regex: search, $options: 'i'}},
//         {socialMediaHandles: {$regex: search, $options: 'i'}},
//       ]
//     }
//     if(category){
//       query.category = category
//     }
//     if(country){
//       query.country = country
//     }
//     if(language){
//       query.language = language
//     }
//     if(socialMediaHandles){
//       query.socialMediaHandles = socialMediaHandles
//     }
//     const data = await User.paginate({role: "influencer", ...query}, options)
//     res.status(200).json({
//       status: "success",
//       data
//     })
//   }catch(e){
//     console.log(e)
//     res.status(502).json({
//       status: "error"
//     })
//   }
// })

// router.get("/influencers", async(req, res, next)=>{
//   try{
//     const page = parseInt(req.query.page)
//     const limit = parseInt(req.query.limit)
//     const sort = req.query.sort
//     const category = req.query.category
//     const country = req.query.country
//     const language = req.query.language
//     const search = req.query.search
//     const filter = {}
//     if(category){
//       filter.category = category
//     }
//     if(country){
//       filter.country = country
//     }
//     if(language){
//       filter.language = language
//     }
//     if(search){
//       filter.name = {$regex: search, $options: "i"}
//     }
//     const data = await User.paginate({role: "influencer", ...filter}, {page, limit, sort})
//     res.status(200).json({
//       status: "success",
//       data
//     })
//   }catch(e){
//     console.log(e)
//     res.status(502).json({
//       status: "error"
//     })
//   }
// })

// get influencer by id using Influencer model
router.get("/influencer/:id", async(req, res, next)=>{
  try{
    const id = req.params.id
    const data = await User.findOne({_id: id})
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
  const {campaignId, sender} = req.body
  
  try{

    const data = bids.find({campaignId:campaignId, sender: sender})
    console.log("this is the damsn",data)
    if(data.length !== 0){
      res.status(409).json({
        status: "error",
        msg: "Bid All ready submitted"
      })
    }
    else{
      bids.create(req.body)
    res.status(200).json({
      status: "success",
    })
    }
    
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
    const data = await invites.find({to: id, accepted: false})
    .populate("campaignId")
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

    const msg = {
    text: "Accepting the invite",
    users:[
      data["sender"].toString(),
      data["to"].toString()
    ],
    sender: data["to"]
  }
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

router.post("/acceptcontract/:id", async (req, res) => {
  const id= req.params.id
  try{
    const data = await contracts.find({_id:id})
    await contracts.updateOne({_id:id}, {accepted:true})
    const msg = {
      text: "Contract accepted",
      users:[
        data["sender"].toString(),
        data["to"].toString()
      ],
      sender: data["to"]
    }
    await Message.create(msg)
    res.status(200).json({
      status: "success",
      
    })
  }catch(e){
    console.log(e)
    res.status(500).json({
      status: "error",
      msg: "an error occured",
      message: e
    
    })
  }
})

router.post("/rejectContract", ()=>{})



module.exports = router