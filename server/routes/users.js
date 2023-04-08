var express = require('express');
var router = express.Router();
const passport = require('passport');
const axios = require('axios');
const CLIENT_URL = "http://localhost:5173/brandhome"
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// send user object
router.get('/user', function(req, res, next) {
  if(req.user){
    res.send(req.user);
  }else{
    // user not loggedin
    res.status(403).send('User not logged in');
  }
});

// implement routes for google sso
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
// router.get(
//   '/google/callback',  
//   passport.authenticate("google", {
//   successRedirect: "http://localhost:5173/brandhome",
//   failureRedirect: "/auth/login/failed"
//  })); 

// router.get('/google/callback', 
//   passport.authenticate("google", { failureRedirect: "/auth/login/failed"}),
//   function(req, res) {
    
//     // Successful authentication, redirect home.
//     res.redirect('http://localhost:5173/brandhome');
//   }
//  ); 

router.get(
    "/google/callback", 
    passport.authenticate("google",{
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/login/failed"
  })
);

// router.get(
//   "/google/callback", 
//   passport.authenticate('google'),
//   (req, res) => {
//     res.redirect('/')
//   }
// );

// router.get('/auth/google/callback',function(req, res, next) {
//   passport.authenticate('google', function(err, user, info) {
//     console.log('--------------------user---------------------\n', user)
//     if (err) { return next(err); }
//     // res.redirect('http://localhost:5173');
//     if (!user) { return res.redirect('/'); }
//     console.log('-----------------res-----------------\n', res)

//     // Redirect the client to a different URL
//     return res.send(user);
//   })(req, res, next);

//   console.log('-----------------req-----------------\n', req)
// });

// call flask api to verify account
router.post('/verify', async function(req, res, next) {
  // let headersList = {
  //   "Accept": "*/*",
  //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  //   "Content-Type": "application/json"
  //  }
      
  //  let response = await fetch("http://127.0.0.1:3000/users/verify", { 
  //    method: "POST",
  //    body: {"url":req.body.url},
  //    headers: headersList
  //  });
   
  //  let data = await response.text();
  //  console.log(data);
  //  res.send(data);

  const url = "http://127.0.0.1:6000/verifyprofile";
  // make axios post call on url

  axios.post(url, {
    username: req.body.username
  })
  .then(function (response) {
    // handle success
    console.log(response);
    res.send(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.send(error);
  })
})

router.post('/keywords', async function(req, res, next) {

  const url = "http://127.0.0.1:6000/keywords";
  // make axios post call on url

  axios.post(url, {
    description: req.body.description
  })
  .then(function (response) {
    // handle success
    console.log(response);
    res.send(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.send(error);
  })
})

router.get('/auth/google/callback',(req, res, next) => {
  passport.authenticate('google', function(err, user, info) {
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

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: 'http://localhost:5173/brandhome',
  failureRedirect: '/login',
  session: false
}));

router.get('/auth/linkedin',
  passport.authenticate('linkedin', { session: false }),
  function(req, res){
  // The request will be redirected to LinkedIn for authentication, so this
  // function will not be called.
});

router.get('/youtube/callback', passport.authenticate('youtube', {
  successRedirect: 'http://localhost:5173/brandhome',
  failureRedirect: '/login',
  session: false
}));

router.get('/auth/youtube',
  passport.authenticate('youtube', { session: false }),
  function(req, res){
  // The request will be redirected to LinkedIn for authentication, so this
  // function will not be called.
});

router.get('/addInstaInfluencers', async (req, res, next) => {
  try{
    const data = await loadInsta()
      
    if(data){
      res.send(data);
    } else {
      res.send("error");
    }
  } catch (err) {
    console.log(err);
  }
})

router.get('/addYoutubeInfluencers', async (req, res, next) => {
  try{
    const data = await loadYoutube()
      
    if(data){
      res.send(data);
    } else {
      res.send("error");
    }
  }
  catch (err) {
    console.log(err);
  }
})

router.get('/addTiktokInfluencers', async (req, res, next) => {
  try{
    const data = await loadTiktok()
      
    if(data){
      res.send(data);
    } else {
      res.send("error");
    }
  }
  catch (err) {
    console.log(err);
  }
})

const loadYoutube = async () => {
  const url = "http://127.0.0.1:3333/youtube_data";

  let resp = await axios.post(url)
  console.log(resp.data);
  return resp.data;
}

const loadTiktok = async () => {
  const url = "http://127.0.0.1:3333/tiktok_data";

  let resp = await axios.post(url)
  console.log(resp.data);
  return resp.data;
}

const loadInsta = async () => {
  const url = "http://127.0.0.1:3333/insta_data";

  let resp = await axios.post(url)
  console.log(resp.data);
  return resp.data;
}

module.exports = router;