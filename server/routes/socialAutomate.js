var express = require('express');
var router = express.Router();
const axios = require('axios');
const Social = require('../models/Social');
const cache = require('memory-cache');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const qs = require('querystring');
const FormData = require('form-data');
const { RedditModel } = require('../models/socialPlatforms');
const ScheduleModel = require('../models/schedules');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + Date.now() + extension);
    },
  });
  
const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extension) {
        cb(null, true);
    } else {
        cb(new Error('Only jpeg, jpg, and png files are allowed'));
    }
}});

const uploadVideo = multer({ storage: storage, fileFilter: (req, file, cb) => {
    const allowedFileTypes = /mp4|mov|avi/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extension) {
        cb(null, true);
    } else {
        cb(new Error('Only mp4, mov, and avi files are allowed'));
    }
}});

router.get('/', function(req, res, next) {
  res.send('Social media Automation API');
});

//----------------------------- REDIT -----------------------------
router.get('/reddit', function(req, res, next) {
    res.send('Reddit API');
    // Performs tasks:
    // create subreddit
    // create post
    // read post
    // update post
    // delete post
    // read comments / analytics
});

router.get('/reddit/me', async function(req, res, next) {
   try {
        console.log("Req.user: ",req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ",cachedProfile?.profile)

        if(cachedProfile) {
            console.log('Using cached Reddit profile');
            return res.status(200).send({ profile: cachedProfile?.profile });
        }

        // get the access token from the database on user id
        const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
        if(!creds){
            return res.status(404).send('No Reddit credentials found');
        } else {
            const access_token = creds.accessToken;

            // get the user profile from reddit
            const response = await axios.get('https://oauth.reddit.com/api/v1/me', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            
            // check for successful response
            if(response.status !== 200) {
                throw new Error(`Failed to fetch Reddit profile with status code: ${response.status}`);
            }

            const profile = response.data;
            cache.put(cacheKey, {"profile":profile, "accessToken":access_token}, 1000 * 60 * 5); // cache for 5 minutes
            
            // return the user profile
            res.status(200).send({ profile });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch Reddit profile');
    }
});

//Create a subreddit
router.post('/reddit/createSubreddit', async function(req, res, next) {
    try {
        console.log("Req.user: ",req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ",cachedProfile)

        let access_token = null;
        let uid = null;

        if(cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
            uid = cachedProfile.username;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if(!creds){
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
                uid = creds.username;
            }
        }

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer "+access_token, 
           }
           
           let formdata = new FormData();
           formdata.append("name", "TestSubRedditAPI22");
           formdata.append("title", "My New Subreddit API2");
           formdata.append("public_description", "Testing API, plz delete me");
           formdata.append("type", "public");
           formdata.append("lang", "en");
           formdata.append("link_type", "any");
           
           let bodyContent =  formdata;
           
           let reqOptions = {
             url: "https://oauth.reddit.com/api/site_admin",
             method: "POST",
             headers: headersList,
             data: bodyContent,
           }
           
           let response = await axios.request(reqOptions);
           console.log(response.data.jquery);

            let errors = []; // An empty array to store the errors
            for (let i = 0; i < response.data.jquery.length; i++) {
            let instruction = response.data.jquery[i]; // Get the current instruction
            let method = instruction[2]; // Get the method name
            let args = instruction[3]; // Get the arguments
            console.log(method, args); // Print the method and arguments
            if (method == 'call' && args.length && args[0].includes('error') > 0) {
                // If the method is text and there is an argument
                let error = args[0]; // Get the error message
                errors.push(error); // Add it to the errors array
            }
            }
            console.log(errors); // Print the errors array
            if (errors.length>0) {
                // If there are errors
                console.log('There are errors'); // Print that there are errors
                return res.status(500).send({error: errors[0]}); // Send the errors to the client
            }

        // check for successful response
        if(response.status !== 200) {
            res.status(500).send(`Failed to create subreddit with status code: ${response.status}`);
        }

        //console.log("response: ",response);

        res.status(200).send("ok");
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch LinkedIn profile');
    }
});

// get and load subreddits
router.get('/reddit/getSubreddits', async function(req, res, next) {
    try {
        console.log("Req.user: ",req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ",cachedProfile)

        // check if we have subreddits saved in database
        // const resp = await RedditModel.find({ userid: req.user._id });
        // if(resp.length > 0) {
        //     console.log('Using cached Reddit subreddits');
        //     return res.status(200).send({ subreddits: resp });
        // }

        let access_token = null;

        if(cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if(!creds){
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
            }
        }

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer "+access_token,
        }

        const resp2 = await axios.get('https://oauth.reddit.com/subreddits/mine/subscriber', { headers: headersList });

        // check for successful response
        if(resp2.status !== 200) {
            return res.status(500).send(`Failed to fetch Reddit subreddits with status code: ${resp2.status}`);
        }

        // save the data in database
        const subreddits = [];

        for(let i=0; i<resp2.data.data.children.length; i++) {
            const subreddit = resp2.data.data.children[i].data;
            subreddits.push({
                userid: req.user._id,
                subreddit: subreddit.display_name,
                title: subreddit.title,
                description: subreddit.public_description,
                icon: subreddit.icon_img,
                banner: subreddit.banner_img,
                subredditid: subreddit.name,
            });
        }

        console.log("subreddits: ",subreddits);
        // await RedditModel.insertMany(subreddits).then(function(){
        //     console.log("Data inserted")  // Success
        // }).catch(function(error){
        //     console.log(error)      // Failure
        // });

        const bulkOps = subreddits.map((subreddit) => ({
            updateOne: {
              filter: { subredditid: subreddit.subredditid },
              update: { $set: subreddit },
              upsert: true, // create new document if it doesn't exist
            },
        }));
          
        await RedditModel.bulkWrite(bulkOps).then((result) => {
            console.log("Data inserted")  // Success
            console.log(result);
            }).catch(function(error){
                console.log(error)      // Failure
            });

        res.status(200).send({ subreddits: subreddits });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch Reddit subreddits');
    }
});

// load posts for a subreddit
router.get('/reddit/getPosts', async function(req, res, next) {
    try {
        const { subreddit } = req.query;
        console.log("Req.user: ",req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ",cachedProfile)

        let access_token = null;

        if(cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if(!creds){
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
            }
        }

        const resp = await axios.get(`https://oauth.reddit.com/r/${subreddit}/top`, {
            headers: {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": "Bearer "+access_token,
            },
            params: {
                t: 'day',
                limit: 10,
            }
        });

        console.log("resp: ",resp);
        // check for successful response
        if(resp.status !== 200) {
            return res.status(500).send(`Failed to fetch Reddit posts with status code: ${resp.status}`);
        }

        res.status(200).send({ posts: resp.data.data.children });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch Reddit posts');
    }
});

//Delete a subreddit
router.delete('/reddit/deleteSubreddit', async function(req, res, next) {
    try {
        const { subreddit } = req.query;
        console.log("Req.user: ",req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ",cachedProfile)

        let access_token = null;
        let uid = null;

        if(cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
            uid = cachedProfile.username;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if(!creds){
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
                uid = creds.username;
            }
        }

        // delete subreddit
        let response = await axios.delete(`https://oauth.reddit.com/api//api/subscribe`, {
            headers: {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                Authorization: `Bearer ${access_token}`
            },
            data: {
                action: 'unsub',
                sr_name: subreddit
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch LinkedIn profile');
    }
});

//Delete a post
router.delete('/reddit/deletePost', async function(req, res, next) {
    try {
        const { subreddit, postid } = req.body;
        console.log("Req.user: ",req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ",cachedProfile)

        let access_token = null;
        let uid = null;

        if(cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
            uid = cachedProfile.username;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if(!creds){
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
                uid = creds.username;
            }
        }

        // delete post in reddit https://oauth.reddit.com/api/del
        let response = await axios.post(`https://oauth.reddit.com/api/del?id=${postid}`, {
            headers: {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": `Bearer ${access_token}`
            }
        });

        console.log("response: ",response);
        if(response.status !== 200) {
            return res.status(500).send(`Failed to delete Reddit post with status code: ${response.status}`);
        }
        
        // delete from database
        let resp = await RedditPost.updateOne(
            { userid: req.user._id, platform: 'reddit' },
            { $pull: { posts: { postid: postid } } }
          );

        if(resp.nModified === 0) {
            return res.status(500).send('Failed to delete Reddit post from database');
        }

        res.status(200).send({ message: 'Successfully deleted Reddit post' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete Reddit post');
    }
});

//Create and send a post to a subreddit
router.post('/reddit/createPost', async function(req, res, next) {
    try {
        const { subreddit, title, text } = req.body;
        console.log("Req.user: ",req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ",cachedProfile)

        let access_token = null;
        let uid = null;

        if(cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
            uid = cachedProfile.username;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if(!creds){
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
                uid = creds.username;
                //cache.put(cacheKey, profile, 1000 * 60 * 5);
            }
        }

        // create post
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer 1637720178257-y51MGIoU0H3yRNIqRUdF8JNG08QNwQ" 
        }
           
        let formdata = new FormData();
        formdata.append("api_type", "json");
        formdata.append("kind", "self");
        formdata.append("sr", subreddit);
        formdata.append("title", title);
        formdata.append("text", text);
        
        let bodyContent =  formdata;
        
        let reqOptions = {
            url: "https://oauth.reddit.com/api/submit",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }
        
        let response = await axios.request(reqOptions);
        console.log(response.data);

        if(response.status !== 200) {
            res.status(500).send(`Failed to create post with status code: ${response.status}`);
        }
        
        // push into the database
        var post = {
            postid: response.data.json.data.id,
            title: title,
            text: text,
            postStatus: "posted"
        }
        console.log(post)

        const postResp = await RedditModel.findOneAndUpdate({ userid: req.user._id, subreddit: subreddit.split('/')[1] }, { $push: { posts: post } }, { upsert: true });
        console.log("res: ",postResp);

        postResp.status(200).send("Post Sent");
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create post');
    }
});

//Schedule Post
router.post('/reddit/schedulePost', async function(req, res, next) {
    try {
        const { subreddit, title, text, scheduledTime } = req.body;
        console.log("Req.user: ",req.user._id);
        var postID = ObjectId().toString();

        // push into the database
        var post = {
            postid: postID,
            title: title,
            text: text,
            postStatus: "scheduled"
        }
        console.log(post)
        await RedditModel.findOneAndUpdate({ userid: req.user._id, subreddit: subreddit.split('/')[1] }, { $push: { posts: post } }, { upsert: true });

        //also push in schedules collection
        var schedule = {
            userid: req.user._id,
            postid: postID,
            platform: "reddit",
            subreddit: subreddit.split('/')[1],
            sendTime: new Date(scheduledTime)
        }
        console.log(schedule)
        await ScheduleModel.create(schedule).then((data) => {
            console.log("data: ",data);
        }).catch((err) => {
            console.log("err: ",err);
            return res.status(500).send("Failed to schedule post");
        })

        res.status(200).send("Post Scheduled");
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create post');
    }
});

// send scheduled post
router.post('/reddit/sendScheduledPost', async function(req, res, next) {
    try {
        const { subreddit, userid, postid } = req.body;
        console.log("Req.user: ",userid);
        const cacheKey = `reddit_${userid}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ",cachedProfile)
        console.log("subreddit: ",subreddit);
        console.log("postid: ",postid);
        var access_token = null;
        res.status(200).send("Post Sent");

        // get the post from the database on user id and subreddit and postid, return the particular post
        const post = await RedditModel.findOne({ userid: userid, subreddit: subreddit, "posts.postid": postid }, { "posts.$": 1 });
        console.log("post: ",post);

        // get the access token from the database on user id
        if(cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: userid, platform: 'reddit' });
            if(!creds){
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
                //cache.put(cacheKey, profile, 1000 * 60 * 5);
            }
        }

        // send the post
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer "+access_token 
        }
           
        let formdata = new FormData();
        formdata.append("api_type", "json");
        formdata.append("kind", "self");
        formdata.append("sr", "r/"+subreddit);
        formdata.append("title", post.posts[0].title);
        formdata.append("text", post.posts[0].text);
        
        let bodyContent =  formdata;
        
        let reqOptions = {
            url: "https://oauth.reddit.com/api/submit",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }
        
        let response = await axios.request(reqOptions);
        console.log(response.data);
        var newPostid = response.data.json.data.id;

        if(response.status !== 200) {
            console.log(`Failed to create post with status code: ${response.status}`);
            // update the post status to failed
            const result1 = await RedditModel.updateOne({ userid: userid, subreddit: subreddit, "posts.postid": postid }, { $set: { "posts.$.postStatus": "failed"} }, { new: true });
            console.log("result1: ",result1);
            return
        }

        // update the post status to posted
        const filter = { userid: userid, subreddit: subreddit, "posts.postid": postid };
        const update = { $set: { "posts.$.postStatus": "posted", "posts.$.postid": newPostid } };
        const options = { new: true };

        const result = await RedditModel.updateOne(filter, update, options);
        console.log("result: ",result);

    } catch (error) {
        console.error(error);
        // res.status(500).send('Failed to send scheduled post');
    }
});

// get comments
router.get('/reddit/comments', async function(req, res, next) {
    try {
        const { postid } = req.query;

        // get comments
        let response = await axios.get(`https://www.reddit.com/comments/${postid}.json`, {
            headers: {
                "Accept": "*/*",
            }
        });

        console.log(response.data[1].data.childern);
        var commentsData = [{}]
        for(var a in response.data[1].data.childern){
            console.log(response.data[1].data.childern[a].data.body);
            commentsData.push({
                body: response.data[1].data.childern[a].data.body,
            })
        }

        res.status(200).send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch comments');
    }
});

//----------------------------- Linkedin -----------------------------
router.get('/linkedin', function(req, res, next) {
    res.status(200).send('Linkedin API');
});

router.get('/linkedin/me', async function(req, res, next) {
    try {
        console.log("Req.user: ",req.user._id);
        const cacheKey = `linkedin_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ",cachedProfile)

        if(cachedProfile) {
            console.log('Using cached LinkedIn profile');
            return res.status(200).send({ profile: cachedProfile });
        }

        // get the access token from the database on user id
        const creds = await Social.findOne({ userid: req.user._id, platform: 'linkedin' });
        if(!creds){
            return res.status(404).send('No LinkedIn credentials found');
        } else {
            const access_token = creds.accessToken;

            // get the user profile from linkedin
            const response = await axios.get('https://api.linkedin.com/v2/me', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            
            // check for successful response
            if(response.status !== 200) {
                throw new Error(`Failed to fetch LinkedIn profile with status code: ${response.status}`);
            }

            const profile = response.data;
            cache.put(cacheKey, profile, 1000 * 60 * 5); // cache for 5 minutes
            
            // return the user profile
            res.status(200).send({ profile });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch LinkedIn profile');
    }
});

router.post('/linkedin/posts', async function(req, res, next) {
    // Text post

    const { text } = req.body;
    if(!text) {
        return res.status(400).send('No text provided');
    }
    try {
        console.log("Req.user: ",req.user._id);
        const cacheKey = `linkedin_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ",cachedProfile)
        let access_token = null;
        let uid = null;

        if(cachedProfile) {
            console.log('Using cached LinkedIn profile');
            access_token = cachedProfile.accessToken;
            uid = cachedProfile.handle;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'linkedin' });
            if(!creds){
                return res.status(404).send('No LinkedIn credentials found');
            } else {
                access_token = creds.accessToken;
                uid = creds.handle;
            }
        }

        // craft the post
        const post = {
            "author": "urn:li:person:"+uid,
            "lifecycleState": "PUBLISHED",
              "specificContent": {
                  "com.linkedin.ugc.ShareContent": {
                      "shareCommentary": {
                          "text": text
                      },
                      "shareMediaCategory": "NONE"
                  }
              },
              "visibility": {
                  "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
              }
          }
        
        // post the text to linkedin
        const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', post, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'Content-Type': 'application/json',
            }
        });

        // check for successful response
        if(response.status !== 201) {
            throw new Error(`Failed to post to LinkedIn with status code: ${response.status}`);
        } else {
            res.status(200).send('Post successful');
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch LinkedIn profile');
    }
});

router.post('/linkedin/imagepost',upload.single('file'), async function(req, res, next) {
    // Image post
    const { originalname, path: Imgpath } = req.file;
    const { text } = req.body;

    console.log("filename: ", originalname);
    console.log("path: ", Imgpath);
    console.log("text: ", text);

    //validate image exists
    if(!originalname || !path) {
        return res.status(400).send('No image provided');
    }

    // get credentials
    var userID = "6416dcf3cc312c2ed3fb1aa2"
    console.log("Req.user: ",userID);
    const cacheKey = `linkedin_${userID}`;
    const cachedProfile = cache.get(cacheKey);
    console.log("cachedProfile: ",cachedProfile)
    let access_token = null;
    let uid = null;

    if(cachedProfile) {
        console.log('Using cached LinkedIn profile');
        access_token = cachedProfile.accessToken;
        uid = cachedProfile.handle;
    } else {
        // get the access token from the database on user id
        const creds = await Social.findOne({ userid: userID, platform: 'linkedin' });
        if(!creds){
            return res.status(404).send('No LinkedIn credentials found');
        } else {
            access_token = creds.accessToken;
            uid = creds.handle;
        }
    }

    //generate upload url https://api.linkedin.com/rest/assets?action=registerUpload
    const response = await axios.post('https://api.linkedin.com/rest/assets?action=registerUpload', 
    {
        "registerUploadRequest":{
            "owner":"urn:li:person:"+uid,
            "recipes":[
               "urn:li:digitalmediaRecipe:feedshare-image"
            ],
            "serviceRelationships":[
               {
                  "identifier":"urn:li:userGeneratedContent",
                  "relationshipType":"OWNER"
               }
            ],
            "supportedUploadMechanism":[
               "SYNCHRONOUS_UPLOAD"
            ]
         }
    },
    {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
            'LinkedIn-Version':'202211'
        }
    });

    if(response.status !== 200) {
        console.log("response reg upload: ", response)
        return res.status(500).send('Failed to generate upload url');
    } else {
        // upload the image to upload url
        console.log("response reg upload: ", response)
        const uploadUrl = response.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
        const asset = response.data.value.asset;
        console.log("uploadUrl: ", uploadUrl);
        console.log("asset: ", asset);
        const encodedUrl = qs.escape(uploadUrl);
        //var uploadUrl = "https://www.linkedin.com/dms-uploads/D4E22AQHOB-6sXG65zQ/uploaded-image/0?ca=vector_feedshare&cn=uploads&sync=1&v=beta&ut=3M_IW4X9FtXGI1"
        const fileContent = fs.readFileSync(Imgpath);

        //initiate Put to upload url with image
        // const resp = await axios.put(uploadUrl, {file: fileContent} , {
        //     headers: {
        //         'Content-Type': 'application/octet-stream',
        //         'Authorization': `Bearer ${access_token}`,
        //     },
        // });
        
        let headersList = {
            "Accept": "*/*",
            'Authorization': `Bearer ${access_token}`,
            "LinkedIn-Version": "202211",
        }

        // let formdata = new FormData();
        // formdata.append("file", fs.createReadStream(Imgpath));

        // fetch("https://www.linkedin.com/dms-uploads/D4E22AQG6HQVKBK8b4g/uploaded-image/0?ca=vector_feedshare&cn=uploads&sync=1&v=beta&ut=3ITdIdvpG7XGI1", {
        //     method: 'PUT',
        //     body: fs.createReadStream(Imgpath),
        //     headers: headersList
        //   })
        //     .then(res => console.log(res))
        //     .catch(err => console.error(err));

        const form = new FormData();
        form.append('file', fs.createReadStream(Imgpath));

        const request_config = {
        headers: {
            "Accept": "*/*",
            'Authorization': `Bearer ${access_token}`,
            "LinkedIn-Version": "202211",
            ...form.getHeaders()
        }
        };
        console.log("form: ", form)
        console.log("request_config: ", request_config)
        console.log("uploadUrl: ", uploadUrl)
        console.log("Imgpath: ", Imgpath)
        const resp = await axios.put(uploadUrl, form, request_config);
        console.log("resp: ", resp)
        if(resp.status !== 201) {
            return res.status(500).send('Failed to upload image');
        }

        // craft the post
        const post = {
            "author": "urn:li:person:"+uid,
            "commentary": text,
            "visibility": "PUBLIC",
            "distribution": {
                "feedDistribution": "MAIN_FEED",
                "targetEntities": [],
                "thirdPartyDistributionChannels": []
            },
            "content": {
                "media": {
                "title":text,
                "id": "urn:li:image:"+asset.split(':')[3],
                }
            },
            "lifecycleState": "PUBLISHED",
            "isReshareDisabledByAuthor": false
        };

        // post the text to linkedin
        const response2 = await axios.post('https://api.linkedin.com/rest/posts', post, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'Content-Type': 'application/json',
                'LinkedIn-Version': '202211',
            }
        });

        // // check for successful response
        if(response2.status !== 201) {
            return res.status(500).send('Failed to post to LinkedIn');
        }

        console.log("response2: ", response2.headers["x-restli-id"]);
    }
    
    res.status(200).send('Image post successful');
});

router.post('/linkedin/videopost',uploadVideo.single('file'), async function(req, res, next) {
    // Image post
    const { originalname, path: Vidpath } = req.file;
    const { text } = req.body;
    const chunkSize = 4194303; // 4 MB

    console.log("filename: ", originalname);
    console.log("path: ", Vidpath);
    console.log("text: ", text);

    var data = fs.createReadStream(Vidpath, {start: 0, end: 4194303});
    console.log("data1: ", data)
    data = fs.createReadStream(Vidpath, {start: 4194304, end: 5001676});
    console.log("data2: ", data)

    //validate image exists
    if(!originalname || !path) {
        return res.status(400).send('No image provided');
    }

    // get credentials
    var userID = "6416dcf3cc312c2ed3fb1aa2"
    console.log("Req.user: ",userID);
    const cacheKey = `linkedin_${userID}`;
    const cachedProfile = cache.get(cacheKey);
    console.log("cachedProfile: ",cachedProfile)
    let access_token = null;
    let uid = null;

    if(cachedProfile) {
        console.log('Using cached LinkedIn profile');
        access_token = cachedProfile.accessToken;
        uid = cachedProfile.handle;
    } else {
        // get the access token from the database on user id
        const creds = await Social.findOne({ userid: userID, platform: 'linkedin' });
        if(!creds){
            return res.status(404).send('No LinkedIn credentials found');
        } else {
            access_token = creds.accessToken;
            uid = creds.handle;
        }
    }

    //generate upload url https://api.linkedin.com/rest/assets?action=registerUpload
    const response = await axios.post('https://api.linkedin.com/rest/videos?action=initializeUpload', 
    { "initializeUploadRequest": {
        "owner": "urn:li:person:"+uid,
        "fileSizeBytes": fs.statSync(Vidpath).size ,
        "uploadCaptions": false,
        "uploadThumbnail": false
     }
    } ,
    {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
            'LinkedIn-Version':'202211'
        }
    });

    console.log("response is: ", response.data.value.uploadInstructions)
    if(response.status !== 200) {
        console.log("response reg upload: ", response)
        return res.status(500).send('Failed to generate upload url');
    } else {
        // upload the image to upload url
        console.log("response reg upload: ", response)
        const uploadUrl = response.data.value.uploadInstructions;
        const asset = response.data.value.video;
        console.log("uploadUrl: ", uploadUrl);
        console.log("asset: ", asset);
        var etags = [];

        for(var urlval in uploadUrl){
            console.log("url: ", uploadUrl[urlval].uploadUrl)
            console.log("start", uploadUrl[urlval].firstByte)
            console.log("end", uploadUrl[urlval].lastByte)

            const form = new FormData();
            form.append('file', fs.createReadStream(Vidpath, {start: uploadUrl[urlval].firstByte, end: uploadUrl[urlval].lastByte}));

            const request_config = {
                headers: {
                    "Accept": "*/*",
                    'Authorization': `Bearer ${access_token}`,
                    "LinkedIn-Version": "202211",
                    "Content-Type":"application/octet-stream",
                    ...form.getHeaders()
                }
            };

            console.log("form: ", form)
            console.log("request_config: ", request_config)
            console.log("uploadUrl: ", uploadUrl[urlval].uploadUrl)
            console.log("Vidpath: ", Vidpath)
            const resp = await axios.post(uploadUrl[urlval].uploadUrl, form, request_config);

            if(resp.status !== 200) {
                return res.status(500).send('Failed to upload video');
            }

            console.log("[_+_] resp: ", resp)
            etags.push(resp.headers.etag)

        }

        console.log("etags: ", etags)

        // finalizing upload https://api.linkedin.com/rest/videos?action=finalizeUpload
        const response2 = await axios.post('https://api.linkedin.com/rest/videos?action=finalizeUpload',
        {
            "finalizeUploadRequest": {
                "video": asset,
                "uploadToken": "",
                "uploadedPartIds": etags
            }
        },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
                'LinkedIn-Version':'202211',
                "X-Restli-Protocol-Version": '2.0.0'
            }
        });
        console.log("response2: ", response2)

        if(response2.status !== 200) {
            console.log("response2: ", response2)
            return res.status(500).send('Failed to finalize upload');
        }        

        // craft the post
        const post = {
            "author": "urn:li:person:"+uid,
            "commentary": text,
            "visibility": "PUBLIC",
            "distribution": {
                "feedDistribution": "MAIN_FEED",
                "targetEntities": [],
                "thirdPartyDistributionChannels": []
            },
            "content": {
                "media": {
                "title":text,
                "id": asset,
                }
            },
            "lifecycleState": "PUBLISHED",
            "isReshareDisabledByAuthor": false
        };

        // // post the text to linkedin
        const response3 = await axios.post('https://api.linkedin.com/rest/posts', post, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'Content-Type': 'application/json',
                'LinkedIn-Version': '202211',
            }
        });

        // // check for successful response
        if(response3.status !== 201) {
            return res.status(500).send('Failed to post to LinkedIn');
        }

        console.log("response2: ", response3.headers["x-restli-id"]);
        console.log(asset)
    }
    res.status(200).send('Image post successful');
});

router.delete('/linkedin/post', async function(req, res, next) {
    const posturn = encodeURIComponent(req.body.posturn);

    var userID = "6416dcf3cc312c2ed3fb1aa2"
    console.log("Req.user: ",userID);
    const cacheKey = `linkedin_${userID}`;
    const cachedProfile = cache.get(cacheKey);
    console.log("cachedProfile: ",cachedProfile)
    let access_token = null;
    let uid = null;

    if(cachedProfile) {
        console.log('Using cached LinkedIn profile');
        access_token = cachedProfile.accessToken;
        uid = cachedProfile.handle;
    } else {
        // get the access token from the database on user id
        const creds = await Social.findOne({ userid: userID, platform: 'linkedin' });
        if(!creds){
            return res.status(404).send('No LinkedIn credentials found');
        } else {
            access_token = creds.accessToken;
            uid = creds.handle;
        }
    }

    // delete the post
    const response = await axios.delete(`https://api.linkedin.com/rest/posts/${posturn}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'X-Restli-Protocol-Version': '2.0.0',
            'Content-Type': 'application/json',
            'LinkedIn-Version': '202211',
            'X-RestLi-Method': 'DELETE'
        }
    });

    // check for successful response
    if(response.status !== 204) {
        return res.status(500).send('Failed to delete post');
    }

    res.status(200).send('Post deleted successfully');
});

//----------------------------- Tiktok -----------------------------
router.get('/tiktok', function(req, res, next) {
    res.send('Tiktok API');
});

//----------------------------- Youtube -----------------------------
router.get('/youtube', function(req, res, next) {
    res.send('Youtube API');
});

//----------------------------- Instagram -----------------------------
router.get('/instagram', function(req, res, next) {
    res.send('Instagram API');
});

//----------------------------- Pinterest -----------------------------
router.get('/pinterest', function(req, res, next) {
    res.send('Pinterest API');
});

//----------------------------- Facebook -----------------------------
router.get('/facebook', function(req, res, next) {
    res.send('Facebook API');
});

//----------------------------- Dev.to -----------------------------
router.get('/devto', function(req, res, next) {
    res.send('Dev.to API');
});

module.exports = router;