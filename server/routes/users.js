var express = require('express');
var router = express.Router();
const passport = require('passport');
const axios = require('axios');
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
router.get(
  '/google/callback',  
  passport.authenticate("google", {
  successRedirect: "http://localhost:5173/brandhome",
  failureRedirect: "/auth/login/failed"
 })); 

// router.get('/auth/google/callback',function(req, res, next) {

//   // generate the authenticate method (the anonymous method) and
//   //     associate it with the 'local' strategy
//   passport.authenticate('google', function(err, user, info) {
//     if (err) { return next(err); }
//     // res.redirect('http://localhost:5173');
//     if (!user) { return res.redirect('/'); }
    
//     return res.redirect('http://localhost:5173/brandhome');
//   })(req, res, next);
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

  const url = "http://127.0.0.1:6000/";
  // make axios post call on url

  axios.post(url, {
    url: req.body.url
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

module.exports = router;
