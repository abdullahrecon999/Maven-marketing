var express = require('express');
var router = express.Router();
const passport = require('passport');
const axios = require('axios');
const CLIENT_URL = "http://localhost:5173/brandhome"
const Listing = require('../models/listing');
const Social = require('../models/Social');
const User = require('../models/User');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// send user object
router.get('/user', function(req, res, next) {
  console.log(req.session)
  //console.log('-----------------req.user-----------------\n', req.user)
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

//router.get('/auth/pinterest', passport.authenticate('pinterest', { session: false }));

// router.get('/pinterest/callback', passport.authenticate('pinterest', {
//   successRedirect: 'http://localhost:5173/brandhome',
//   failureRedirect: '/login',
//   session: false,
//   failWithError: true
// }));

const CLIENT_ID = '1486333';
const CLIENT_SECRET = 'f0c60e253b4ec9a81c4798772d30b161cd1b60ad';
const REDIRECT_URI = 'https://localhost:3000/users/pinterest/callback';

// route to initiate the authentication flow
router.get('/auth/pinterest', (req, res) => {
  var state = req.query.user;
  const scopes = ['user_accounts:read', 'boards:read', 'boards:write', 'pins:read', 'pins:write', "catalogs:read", "catalogs:write"];
  const authUrl = `https://www.pinterest.com/oauth/?state=${state}&response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(',')}`;
  res.redirect(authUrl);
});

// route to handle the callback from Pinterest
router.get('/pinterest/callback', async (req, res) => {
  const authCode = req.query.code;
  const { state } = req.query;

  // exchange the authorization code for an access token
  const authHeader = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;
  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    code: authCode,
    redirect_uri: REDIRECT_URI,
  });

  const response = await axios.post('https://api.pinterest.com/v5/oauth/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authHeader,
    },
  });

  const accessToken = response.data.access_token;
  const refreshToken = response.data.refresh_token;
  console.log(response)

  // use the access token to make requests to the Pinterest API
  const userData = await axios.get(`https://api.pinterest.com/v5/user_account`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  // handle the user's data here
  console.log(userData.data);

  // Create a new Social account if not exists else create one
  Social.findOne({ userid: state, platform: 'pinterest' }).then((social) => {
    if (social) {
      // Update
      social.accessToken = accessToken;
      social.refreshToken = refreshToken;
      social.save();
    } else {
      const newSocial = new Social({
        platform: "pinterest",
        userid: state,
        handle: userData.data.username,
        username: userData.username,
        accessToken: accessToken,
        refreshToken: refreshToken,
        profilePic: userData.data.profile_image,
      });
      newSocial.save();
      // add this to user's socials array
      User.findOneAndUpdate({ _id: state }, { $push: { socialMediaAccounts: newSocial._id } }).then(user1 => {
        console.log("UserORG: ", state)
        console.log("User: ", user1)
      })
    }
  });

  console.log("access token: ", accessToken)
  res.redirect('/');
});

const RCLIENT_ID = 'lzYeI_b9Cnpd24JL5P1aNQ';
const RCLIENT_SECRET = 'aGoS6q0RYvRJtgyV3uUdW4IOYUWuQg';
const RREDIRECT_URI = 'http://localhost:3000/users/reddit/callback';

router.get('/auth/reddit', (req, res) => {
  //const state = Math.random().toString(36).substring(7);
  var state = req.query.user;
  const url = `https://www.reddit.com/api/v1/authorize?client_id=${RCLIENT_ID}&response_type=code&state=${state}&redirect_uri=${RREDIRECT_URI}&duration=permanent&scope=identity,edit,flair,history,livemanage,modconfig,modflair,modlog,modposts,modwiki,mysubreddits,privatemessages,read,report,save,submit,subscribe,vote,wikiedit,wikiread`;

  res.redirect(url);
});

router.get('/reddit/callback', async (req, res) => {
  const { code, state } = req.query;
  var user = req.user._id;
  console.log("state: ", user)
  try {
    // Exchange the authorization code for an access token
    const response = await axios.post('https://www.reddit.com/api/v1/access_token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: RREDIRECT_URI,
    }, {
      auth: {
        username: RCLIENT_ID,
        password: RCLIENT_SECRET,
      },
      headers: {
        'User-Agent': 'MyRedditApp/1.0.0',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log("RESPONSE: ", response.data)
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    console.log("access token: ", accessToken)
    console.log("refresh token: ", refreshToken)

    // Use the access token to get the user's profile
    const userData = await axios.get('https://oauth.reddit.com/api/v1/me', {
      headers: {
        Authorization: `bearer ${accessToken}`,
        'User-Agent': 'MyRedditApp/1.0.0',
      },
    });

    // handle the user's data here
    console.log(userData.data);

    // Create a new Social account if not exists else create one
    Social.findOne({ userid: user, platform: 'reddit' }).then((social) => {
      if (social) {
        // Update
        social.accessToken = accessToken;
        social.refreshToken = refreshToken;
        social.save();
      } else {
        const newSocial = new Social({
          platform: "reddit",
          userid: user,
          handle: userData.data.id,
          username: userData.data.subreddit.display_name_prefixed,
          accessToken: accessToken,
          refreshToken: refreshToken,
          profilePic: userData.data.icon_img,
        });
        newSocial.save();
        // add this to user's socials array
        User.findOneAndUpdate({ _id: user }, { $push: { socialMediaAccounts: newSocial._id } }).then(user => {
          console.log("User: ", user)
        })
      }
    });

    res.redirect('http://localhost:5173/brandhome')
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/instagram/callback', passport.authenticate('instagram', {
  successRedirect: 'http://localhost:5173/brandhome',
  failureRedirect: '/login',
  session: false
}));

router.get('/auth/instagram',
  passport.authenticate('instagram', { session: false }),
);

router.get('/auth/facebook',
  passport.authenticate('facebook', { session: false }),
);

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: 'http://localhost:5173/brandhome',
  failureRedirect: '/login',
  session: false
}));

// router.get('/tiktok/callback', passport.authenticate('tiktok', {
//   successRedirect: 'http://localhost:5173/brandhome',
//   failureRedirect: '/login',
//   session: false
// }));

router.get('/auth/tiktok',
  passport.authenticate('tiktok', { session: false }),
);

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: 'http://localhost:5173/brandhome',
  failureRedirect: '/login',
  session: false
}));

router.get('/auth/linkedin', (req, res, next) => {
  req.session.user = req.query.user;
  next();
}, passport.authenticate('linkedin'));


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
    console.log(data)

    const operations = data.map((val) => ({
      updateOne: {
        filter: { social_media_handle: val.social_media_handle },
        update: {
          $setOnInsert: val,
        },
        upsert: true
      }
    }));
    
    Listing.bulkWrite(operations)
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  }
  catch (err) {
    console.log(err);
  }
})

router.get('/addYoutubeInfluencers', async (req, res, next) => {
  try{
    const data = await loadYoutube()
    console.log(data)
  
    const operations = data.map((val) => ({
      updateOne: {
        filter: { social_media_handle: val.social_media_handle },
        update: {
          $setOnInsert: val,
        },
        upsert: true
      }
    }));
    
    Listing.bulkWrite(operations)
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  }
  catch (err) {
    console.log(err);
  }
})

router.get('/addTiktokInfluencers', async (req, res, next) => {
  try{
    const data = await loadTiktok()
    console.log(data)

    const operations = data.map((val) => ({
      updateOne: {
        filter: { url: val.url },
        update: {
          $setOnInsert: val,
        },
        upsert: true
      }
    }));
    
    Listing.bulkWrite(operations)
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
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