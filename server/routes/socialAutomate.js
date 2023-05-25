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
const BulkSchedules = require('../models/bulkSchedules');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const RedditImageUploader = require('../utils/redditUpload');
const moment = require('moment-timezone');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "daui7qmed",
    api_key: "628798437128441",
    api_secret: "VsYtr4Udlmnj3X0AlRercugTfaU"
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + extension);
    },
});

const upload = multer({
    storage: storage, fileFilter: (req, file, cb) => {
        const allowedFileTypes = /jpeg|jpg|png|mp4|mov|avi/;
        const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extension) {
            cb(null, true);
        } else {
            cb(new Error('Only jpeg, jpg, mp4, and png files are allowed'));
        }
    }
});

const uploadVideo = multer({
    storage: storage, fileFilter: (req, file, cb) => {
        const allowedFileTypes = /mp4|mov|avi/;
        const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extension) {
            cb(null, true);
        } else {
            cb(new Error('Only mp4, mov, and avi files are allowed'));
        }
    }
});

router.get('/', function (req, res, next) {
    res.send('Social media Automation API');
});

//----------------------------- GPT -----------------------------

router.post('/gpt', async function (req, res, next) {
    const { prompt } = req.body;

    const response = await axios.post('http://localhost:6000/generate', { prompt: prompt },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    if (response.status != 200) {
        console.log(response.data);
        res.status(500).send({ error: response.data });
    }
    console.log(response.data);

    res.status(200).send({ response: response.data });
});

//----------------------------- REDIT -----------------------------

// Heatmap data

// Function to generate the necessary data
function generateData(posts) {
    const data = {};

    // Initialize all hours of the day with 0 count
    for (let day = 0; day < 7; day++) {
        data[day] = {};
        for (let hour = 0; hour < 24; hour++) {
        data[day][hour] = 0;
        }
    }

    // Iterate over the posts and update the data object
    posts.forEach(post => {
        const createdTime = moment.unix(post.data.created_utc);
        const createdTimeKarachi = moment.tz(createdTime, 'Asia/Karachi')
        const hour = createdTimeKarachi.hours();
        const day = createdTimeKarachi.day();
        const numComments = post.data.num_comments || 0;

        data[day][hour] += numComments;
    });

    return data;
}

// Function to fetch data from Reddit search endpoint
async function fetchData(subreddits, username) {
    const url = `https://old.reddit.com/search.json?q=(subreddit:${subreddits.join('+OR+subreddit:')})+AND+author:${username}&limit=100`;
    const response = await axios.get(url);
    return response.data.data.children;
}

// Function to fetch data from Reddit search endpoint for single subreddit
async function fetchDataSingle(subreddit) {
    const url = `https://old.reddit.com/search.json?q=(subreddit:${subreddit})&limit=1000`;
    const response = await axios.get(url);
    return response.data.data.children;
}

// Function to get top 3 days with most comments
function getTopThreeDays(data) {
    const flattenedData = Object.entries(data).reduce((acc, [day, hours]) => {
      const dayName = moment().day(Number(day)).format('dddd');
      const maxCount = Math.max(...Object.values(hours));
      const maxHour = Object.keys(hours).find((hour) => hours[hour] === maxCount);
      const formattedTime = moment(maxHour, 'H').format('h A');
      acc.push({ day: dayName, time: `${formattedTime}: ${maxCount} comments` });
      return acc;
    }, []);
  
    const sortedDays = flattenedData.sort((a, b) => b.count - a.count);
  
    const topThreeDays = sortedDays.slice(0, 3).reduce((result, { day, time }) => {
      result[day] = time;
      return result;
    }, {});
  
    return topThreeDays;
  }

router.post('/reddit/v2/getHeatmapSingle', async function (req, res, next) {
    const { subreddit } = req.body;
    console.log("SUBREDDIT: ", subreddit);

    let posts = await fetchDataSingle(subreddit);
    const data = generateData(posts);
    const topThreeDays = getTopThreeDays(data);
    console.log("DATA GENERATED: ", data);

    res.status(200).send({ response: data, topThreeDays: topThreeDays });
});

router.post('/reddit/v2/getHeatmap', async function (req, res, next) {
    const { subreddits, profile } = req.body;
    console.log("SUBREDDITS: ", subreddits);
    console.log("USERNAME: ", profile.username);
    const subredditList = subreddits.map(item => item.subreddit);

    let posts = await fetchData(subredditList, profile.username);
    const data = generateData(posts);
    console.log("DATA GENERATED: ", data);

    res.status(200).send({ response: data });
});

// get subreddit members and online members
const getSubredditStats = async (subredditName) => {
    try {
        const url = `https://www.reddit.com/r/${subredditName}/about.json`;
        const response = await axios.get(url);
        const data = response.data.data;

        return {
            subreddit: subredditName,
            numMembers: data.subscribers,
            numOnlineMembers: data.active_user_count
        };
    } catch (error) {
        console.log(error);
        throw new Error('Error while fetching subreddit stats');
    }
};

const getSubredditStatsList = async (sublist) => {
    const subredditStats = [];

    for (const subredditName of sublist) {
        try {
            const stats = await getSubredditStats(subredditName);
            subredditStats.push(stats);
        } catch (error) {
            console.log(error);
        }
    }

    return subredditStats;
};

// get avg up and comments per post
async function getAverageUpvotesAndComments(username, subreddits) {
    const baseUrl = 'https://old.reddit.com/search.json';
    const query = `(subreddit:${subreddits.join('+OR+subreddit:')})+AND+author:${username}`;
    const url = `${baseUrl}?q=${query}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        const posts = data.data.children.filter(item => item.kind === 't3').map(item => item.data);

        if (posts.length === 0) {
            console.log('No posts found for the given user and subreddits.');
            return {
                averageUpvotesPerPost: 0,
                averageCommentsPerPost: 0
            };
        }

        const totalUpvotes = posts.reduce((sum, post) => sum + post.ups, 0);
        const totalComments = posts.reduce((sum, post) => sum + post.num_comments, 0);
        const averageUpvotesPerPost = totalUpvotes / posts.length;
        const averageCommentsPerPost = totalComments / posts.length;

        return {
            averageUpvotesPerPost,
            averageCommentsPerPost
        };
    } catch (error) {
        console.log('Error while fetching data:', error);
        return {
            averageUpvotesPerPost: 0,
            averageCommentsPerPost: 0
        };
    }
}

// get subreddit, posts and comments for a particular user
async function getPostsAndCommentsByUser(subreddits, username) {
    const baseUrl = 'https://old.reddit.com/search.json';
    const query = `(subreddit:${subreddits.join('+OR+subreddit:')})+AND+author:${username}&limit=100`;
    const url = `${baseUrl}?q=${query}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Group posts, comments, and upvotes by subreddit
        const groupedData = data.data.children.reduce((result, item) => {
            const subreddit = item.data.subreddit;

            if (!result[subreddit]) {
                result[subreddit] = {
                    subreddit,
                    numPosts: 0,
                    numComments: 0,
                    numUpvotes: 0
                };
            }

            if (item.kind === 't3') {
                result[subreddit].numPosts++;
                result[subreddit].numUpvotes += item.data.ups;
                result[subreddit].numComments += item.data.num_comments;
            }

            return result;
        }, {});

        // Convert the grouped data into an array
        const result = Object.values(groupedData);

        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Error while fetching data');
    }
}

// Analytics: get subreddit members and online members
router.post('/reddit/v2/getAnalyticsSubreddits', async function (req, res, next) {
    const { subreddits } = req.body;
    console.log("SUBREDDITS: ", subreddits);
    const subredditList = subreddits.map(item => item.subreddit);

    let data = await getSubredditStatsList(subredditList);
    console.log("DATA: ", data);

    res.status(200).send({ response: data });
});

// Analytics: avg upvotes and comments per post
router.post('/reddit/v2/getAnalyticsAvg', async function (req, res, next) {
    const { subreddits, profile } = req.body;
    console.log("SUBREDDITS: ", subreddits);
    console.log("USERNAME: ", profile.username);
    const subredditList = subreddits.map(item => item.subreddit);

    let data = await getAverageUpvotesAndComments(profile.username, subredditList);
    console.log("DATA: ", data);

    res.status(200).send({ response: data });
});

// Analytics: using subreddits, get the number of post, upvotes and its comments made by a user
router.post('/reddit/v2/getAnalyticsReddits', async function (req, res, next) {
    const { subreddits, profile } = req.body;
    console.log("SUBREDDITS: ", subreddits);
    console.log("USERNAME: ", profile.username);
    const subredditList = subreddits.map(item => item.subreddit);

    let data = await getPostsAndCommentsByUser(subredditList, profile.username);
    console.log("DATA: ", data);

    res.status(200).send({ response: data });
});

// Analytics: using subreddits, get number of post made in each subreddit and the total number of posts
router.post('/reddit/v2/getAnalyticsPosts', async function (req, res, next) {
    const { subreddits } = req.body;
    console.log("SUBREDDITS: ", subreddits);
    console.log("USER ID: ", req.user._id);

    const subredditList = subreddits.map(item => item.subreddit);

    let data = await RedditModel.aggregate([
        {
            $match: {
                userid: ObjectId(req.user._id),
                subreddit: { $in: subredditList }
            }
        },
        {
            $addFields: {
                totalPosts: {
                    $cond: [
                        { $isArray: '$posts' },
                        { $size: '$posts' },
                        0
                    ]
                }
            }
        },
        {
            $group: {
                _id: '$subreddit',
                totalPosts: { $sum: '$totalPosts' }
            }
        }
    ])

    console.log("DATA: ", data);

    res.status(200).send({ response: data });
});


// perform sentiment analysis on a post
const sentimentAnalysis = async (comments) => {
    let prompt = "Analyze the average sentiment of the following list. just return one word as response.\n\n" + comments.join("\n\n");
    const response = await axios.post('http://localhost:6000/generate', { prompt: prompt })

    if (response.status != 200) {
        console.log(response.data);
        return response.data;
    }
    console.log(response.data);
    return response.data;
}

// Get post details
router.post('/reddit/v2/getPostDetails', async function (req, res, next) {
    const { postid } = req.body;

    console.log("POST ID: ", postid);
    let data = await axios.get(`https://www.reddit.com/comments/${postid}.json`)

    res.status(200).send({ response: data.data });
});

// Get post details
router.post('/reddit/v2/getSentiments', async function (req, res, next) {
    const { postid, subreddit } = req.body;
    console.log("POST ID: ", postid);
    console.log("SUBREDDIT: ", subreddit);
    console.log("USER ID: ", req.user._id);

    let data = await axios.get(`https://www.reddit.com/comments/${postid}.json`)

    let sentiment = "";

    // check if the post in user's account have num_comments and upvotes
    await RedditModel.findOne(
        {
            userid: req.user._id,
            subreddit: subreddit,
            'posts.postid': postid
        },
        { 'posts.$': 1 } // Only retrieve the matched post
    )
        .then(async (doc) => {
            if (doc) {
                const post = doc.posts[0];
                const numComments = post.num_comments;
                console.log("Num comments: ", numComments);

                if (numComments === undefined || post.avg_sentiments === undefined || post.avg_sentiments === null) {
                    // update the post with num_comments and upvotes
                    console.log("Updating post with num_comments and upvotes")
                    await RedditModel.updateOne(
                        {
                            userid: req.user._id,
                            subreddit: subreddit,
                            'posts.postid': postid
                        },
                        {
                            $set: {
                                'posts.$.num_comments': data.data[0].data.children[0].data.num_comments,
                                'posts.$.upvotes': data.data[0].data.children[0].data.ups
                            }
                        }
                    )

                    if (data.data[0].data.children[0].data.num_comments >= 1) {
                        // perform the sentiment analysis
                        // send the data back to the client and database
                        let comments = [];
                        for (let i = 0; i < data.data[1].data.children.length; i++) {
                            comments.push(data.data[1].data.children[i].data.body);
                        }
                        console.log("Comments: ", comments);
                        const sentiments = await sentimentAnalysis(comments);
                        console.log("Sentiments: ", sentiments.response);
                        await RedditModel.updateOne(
                            {
                                userid: req.user._id,
                                subreddit: subreddit,
                                'posts.postid': postid
                            },
                            {
                                $set: {
                                    'posts.$.avg_sentiments': sentiments.response
                                }
                            }
                        )

                        sentiment = sentiments;
                    }

                    console.log("Post updated with num_comments and upvotes")
                    return res.status(200).send({ response: sentiment.response });
                } else {
                    if (numComments - data.data[0].data.children[0].data.num_comments >= 10) {
                        // we got more than 10 new comments
                        // perform the sentiment analysis

                        let comments = [];
                        for (let i = 0; i < data.data[1].data.children.length; i++) {
                            comments.push(data.data[1].data.children[i].data.body);
                        }
                        console.log("Comments: ", comments);

                        const sentiments = await sentimentAnalysis(comments);
                        console.log("Sentiments: ", sentiments.response);

                        await RedditModel.updateOne(
                            {
                                userid: req.user._id,
                                subreddit: subreddit,
                                'posts.postid': postid
                            },
                            {
                                $set: {
                                    'posts.$.avg_sentiments': sentiments.response
                                }
                            }
                        )

                        return res.status(200).send({ response: sentiments.response });
                    } else {
                        // get the sentiments from the database

                        let sentiments = await RedditModel.findOne(
                            {
                                userid: req.user._id,
                                subreddit: subreddit,
                                'posts.postid': postid
                            },
                            { 'posts.$': 1 }
                        )

                        console.log("Sentiments Obj: ", sentiments)
                        console.log("Sentiments: ", sentiments.posts[0].avg_sentiments)
                        sentiment = sentiments.posts[0].avg_sentiments;
                        return res.status(200).send({ response: sentiment });
                    }
                }

            } else {
                console.log("No post found");
                return res.status(500).send({ error: "No post found" });
            }
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send({ error: error });
        });

});

// create a Post with media on reddit
router.post('/reddit/v2/createPost', upload.fields([{ name: 'media', maxCount: 1 }]), async function (req, res, next) {

    // get the access token and refresh token from the DB
    const social = await Social.findOne({ userid: req.user._id, platform: "reddit" });
    console.log(social);
    const { accessToken, refreshToken } = social;

    // make axios POST to localhost:6000/createPost

    console.log(req.files.media);
    console.log("Access token: ", accessToken);
    // console.log(path.resolve(req.files.media[0].path));

    console.log("ICOMMING:", req.body);

    const form = new FormData();
    form.append('subreddits', req.body.subreddits);
    form.append('title', req.body.title);
    form.append('text', req.body.text);
    form.append('access_token', accessToken);
    form.append('refresh_token', refreshToken);
    console.log("MEDIA URL: ", req.body.mediaUrl)
    if (req.files.media) {
        form.append('media', path.resolve(req.files?.media[0].path));
    } else {
        form.append('media', '');
    }
    form.append('mediaUrl', req.body.mediaUrl);
    if (req.body.mediaType === 'file') {
        form.append('mediaType', req.files.media[0].mimetype);
    } else {
        form.append('mediaType', req.body.mediaType);
    }

    console.log(form);

    const config = {
        method: 'post',
        url: 'http://localhost:7000/createPostv2',
        headers: {
            ...form.getHeaders()
        },
        data: form
    };

    axios(config)
        .then(async function (response) {
            console.log(JSON.stringify(response.data));
            if (response.data.success == true) {
                // save the post in the DB in appopriate reddits
                var post = {
                    postid: '',
                    title: req.body.title,
                    text: req.body.text,
                    postStatus: "posted",
                    file: {
                        path: '',
                        url: '',
                        mimetype: ''
                    },
                    postedAt: new Date()
                }

                if (req.files.media) {
                    post.file.path = req.files.media[0].path;
                    post.file.url = "";
                    post.file.mimetype = req.files.media[0].mimetype;
                } else if (req.body.mediaUrl) {
                    post.file.path = "";
                    post.file.url = req.body.mediaUrl;
                    post.file.mimetype = req.body.mediaType;
                }

                console.log(post)

                // array of subreddits that need the same post in posts array
                const subredditsList = req.body.subreddits.split(',');
                console.log(subredditsList);
                let index = 0;
                for (let subreddit of subredditsList) {
                    post.postid = response.data.submission_ids[index];
                    let postResp = await RedditModel.findOneAndUpdate({ userid: req.user._id, subreddit: subreddit.split('/')[1] }, { $push: { posts: post } }, { upsert: true });
                    console.log("res: ", postResp);
                }
            }
            res.status(200).json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
});

// get the Bulk schedule posts on reddit
router.get('/reddit/v2/getScheduledPosts', async function (req, res, next) {
    const { _id } = req.user;

    let data = await BulkSchedules.find({ userid: _id });
    console.log(data);

    if (data.length == 0) {
        return res.status(404).json({ error: "No scheduled posts found" });
    }

    res.status(200).json({ data: data });
});

// Find the document with the given userid and retrieve the postIds with status: Scheduled
const getPostIdsWithScheduledStatus = async (userid) => {
    try {
        const bulkSchedule = await BulkSchedules.findOne({ userid });
        if (!bulkSchedule) {
            console.log('Bulk schedule not found for the userid:', userid);
            return [];
        }
        const postIds = bulkSchedule.schedules
            .filter((schedule) => schedule.status === 'scheduled')
            .map((schedule) => schedule.id);
        return postIds;
    } catch (error) {
        // Handle any errors
        console.error('Error retrieving postIds:', error);
        return [];
    }
};

// delete the scheduled post on reddit
router.post('/reddit/v2/deleteScheduledPosts', async function (req, res, next) {
    const { _id } = req.user;

    // get the posts with status scheduled fron BulkSchedules
    getPostIdsWithScheduledStatus(_id)
        .then(async (postIds) => {
            console.log('PostIds with status: Scheduled:', postIds);

            // for every postid, delete the post from reddits posts array
            postIds.forEach(async (postId) => {
                await RedditModel.updateMany(
                    { userid: _id },
                    { $pull: { posts: { postid: postId } } }
                );
            });

            // delete the document in BulkSchedules
            await BulkSchedules.deleteOne({ userid: _id }).then((result) => {
                console.log('BulkSchedule deleted:', result);
            }).catch((error) => {
                console.error('Error deleting BulkSchedule:', error);
                res.status(500).json({ message: 'Server Error' });
            });

            res.status(200).json({ message: 'Scheduled posts deleted successfully' });
        })
        .catch((error) => {
            console.error('Error:', error);
        });

});

// Bulk schedule posts on reddit
router.post('/reddit/v2/bulkSchedule', async function (req, res, next) {
    const { data } = req.body;
    const { _id } = req.user;

    console.log(data);

    // get the access token and refresh token from the DB
    const social = await Social.findOne({ userid: _id, platform: "reddit" });
    const { accessToken, refreshToken } = social;

    for (let sub of data) {
        var postID = ObjectId().toString();
        let subreddit = "r/" + sub.subredditName

        console.log(subreddit);
        const extension = sub.Attachment.split('.').pop().toLowerCase();
        const isGif = extension === 'gif';
        const isImage = ['jpg', 'jpeg', 'png', 'bmp'].includes(extension);
        const isVideo = ['mp4', 'avi', 'mov'].includes(extension);

        // push into the database
        var post = {
            postid: postID,
            title: sub.title,
            text: sub.postText,
            postStatus: "scheduled",
            file: {
                path: '',
                url: '',
                mimetype: ''
            },
            scheduledAt: moment.tz(sub['schedule time'].scheduledAt, 'Asia/Karachi')
        }

        if (isGif || isImage || isVideo) {
            post.file.url = sub.Attachment;
            post.file.mimetype = sub.Attachment.split('.').pop().toLowerCase();
        }

        let newPost = {
            id: postID,
            key: sub.key,
            subredditName: sub.subredditName,
            title: sub.title,
            text: sub.postText,
            attachment: sub.Attachment,
            status: "scheduled",
            scheduledAt: moment.tz(sub['schedule time'].scheduledAt, 'Asia/Karachi'),
            postedAt: null,
            error: ''
        };

        console.log(post)
        const scheduledAt = moment.tz(req.body.scheduledAt, 'Asia/Karachi');

        let postUpdate = await RedditModel.findOneAndUpdate({ userid: _id, subreddit: subreddit.split('/')[1] }, { $push: { posts: post } }, { upsert: false });
        console.log("res: ", postUpdate);
        const scheduledTime = moment.tz(sub['schedule time'].scheduledAt, 'Asia/Karachi');
        const currentTime = moment();

        if (postUpdate === null) {
            // Subreddit not found

            newPost.status = "failed";
            newPost.error = "Subreddit not found";

            BulkSchedules.findOneAndUpdate(
                { userid: _id },
                { $push: { schedules: newPost } },
                { upsert: true }
            )
                .then(updatedSchedule => {
                    if (updatedSchedule) {
                        console.log('Document updated successfully:', updatedSchedule);
                    } else {
                        console.log('New document created and post added successfully.');
                    }
                })
                .catch(error => {
                    console.error('Failed to update or create document:', error);
                });

            console.log("Subreddit not found");
        } else if (scheduledTime.isBefore(currentTime)) {
            console.log("scheduled time is before current time");
            // scheduled time is before current time
            newPost.status = "failed";
            newPost.error = "Scheduled time is before current time";

            await BulkSchedules.findOneAndUpdate(
                { userid: _id },
                { $push: { schedules: newPost } },
                { upsert: true }
            )
        } else {
            // also push in schedules collection
            var schedule = {
                userid: _id,
                postid: postID,
                platform: "reddit",
                subreddit: subreddit.split('/')[1],
                sendTime: moment.tz(sub['schedule time'].scheduledAt, 'Asia/Karachi')
            }
            console.log(schedule)
            await ScheduleModel.create(schedule)

            await BulkSchedules.findOneAndUpdate(
                { userid: _id },
                { $push: { schedules: newPost } },
                { upsert: true }
            )
        }
    }

    res.status(200).send({ response: "success" });
});

// create a Text post on reddit
router.post('/reddit/v2/createTextPost', async function (req, res, next) {
    const { subreddits, title, text } = req.body;

    // get the access token and refresh token from the DB
    const social = await Social.findOne({ user_id: req.user._id, platform: "reddit" });
    const { access_token, refresh_token } = social;

    // make axios POST to localhost:6000/createPost

    const form = new FormData();
    form.append('subreddits', req.body.subreddits);
    form.append('title', req.body.title);
    form.append('text', req.body.text);
    form.append('access_token', access_token);
    form.append('refresh_token', refresh_token);

    const config = {
        method: 'post',
        url: 'http://localhost:6000/createPost',
        headers: {
            ...form.getHeaders()
        },
        data: form
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.status(200).json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
});

async function uploadFile(filePath) {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

//Schedule Post v2 api
router.post('/reddit/v2/schedulePost', upload.fields([{ name: 'media', maxCount: 1 }]), async function (req, res, next) {
    try {
        // get the access token and refresh token from the DB
        const social = await Social.findOne({ userid: req.user._id, platform: "reddit" });
        console.log(social);
        const { accessToken, refreshToken } = social;

        console.log("Req.user: ", req.user._id);

        for (let subreddit of req.body.subreddits.split(',')) {
            var postID = ObjectId().toString();

            // push into the database
            var post = {
                postid: postID,
                title: req.body.title,
                text: req.body.text,
                postStatus: "scheduled",
                file: {
                    path: '',
                    url: '',
                    mimetype: ''
                },
                scheduledAt: moment.tz(req.body.scheduledAt, 'Asia/Karachi')
            }

            // get the url of image from cloudinary if file path is provided
            if (req.files.media) {
                post.file.path = path.resolve(req.files?.media[0].path);
                post.file.url = await uploadFile(req.files.media[0].path); // use cloudinary to upload the file and get the url
                post.file.mimetype = req.files.media[0].mimetype;
            } else if (req.body.mediaUrl) {
                post.file.path = "";
                post.file.url = req.body.mediaUrl;
                post.file.mimetype = req.body.mediaType;
            }

            console.log(post)
            const scheduledAt = moment.tz(req.body.scheduledAt, 'Asia/Karachi');

            console.log("ScheduledAt: ", scheduledAt)
            console.log("ScheduledAt 2: ", new Date(req.body.scheduledAt))
            let postUpdate = await RedditModel.findOneAndUpdate({ userid: req.user._id, subreddit: subreddit.split('/')[1] }, { $push: { posts: post } }, { upsert: true });
            console.log("res: ", postUpdate);
            //also push in schedules collection
            var schedule = {
                userid: req.user._id,
                postid: postID,
                platform: "reddit",
                subreddit: subreddit.split('/')[1],
                sendTime: new Date(req.body.scheduledAt)
            }
            console.log(schedule)
            await ScheduleModel.create(schedule).then((data) => {
                console.log("data: ", data);
            }).catch((err) => {
                console.log("err: ", err);
                return res.status(500).send("Failed to schedule post");
            })
        }

        res.status(200).send("Post Scheduled");
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create post');
    }
});

// send Scheduled Post v2 api
router.post('/reddit/v2/sendScheduledPost', async function (req, res, next) {
    try {
        const { subreddit, userid, postid } = req.body;
        console.log("Req.user: ", userid);
        console.log("subreddit: ", subreddit);
        console.log("postid: ", postid);
        const cacheKey = `reddit_${userid}`;
        const cachedProfile = cache.get(cacheKey);
        var access_token = null;
        var refresh_token = null;
        res.status(200).send("Post Sent");

        // get the post from the database on user id and subreddit and postid, return the particular post
        const post = await RedditModel.findOne({ userid: userid, subreddit: subreddit, "posts.postid": postid }, { "posts.$": 1 });
        console.log("post: ", post);

        // get the access token from the database on user id
        if (cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
            refresh_token = cachedProfile.refreshToken;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: userid, platform: 'reddit' });
            if (!creds) {
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
                refresh_token = creds.refreshToken;
                //cache.put(cacheKey, profile, 1000 * 60 * 5);
            }
        }

        // send the post
        const form = new FormData();
        form.append('subreddits', 'r/' + subreddit);
        form.append('title', post.posts[0].title);
        form.append('text', post.posts[0].text);
        form.append('access_token', access_token);
        form.append('refresh_token', refresh_token);

        if (post.posts[0].file.path) {
            form.append('media', path.resolve(post.posts[0].file.path));
            form.append('mediaType', post.posts[0].file.mimetype);
            form.append('mediaUrl', '')
        } else if (post.posts[0].file.url) {
            form.append('mediaUrl', post.posts[0].file.url);
            form.append('mediaType', post.posts[0].file.mimetype);
            form.append('media', '')
        }

        console.log(form);

        const config = {
            method: 'post',
            url: 'http://localhost:7000/createPostv2',
            headers: {
                ...form.getHeaders()
            },
            data: form
        };

        axios(config).then(async (response) => {
            console.log(response.data);
            if (response.status !== 200) {
                console.log(`Failed to create post with status code: ${response.status}`);
                // update the post status to failed
                const result1 = RedditModel.updateOne({ userid: userid, subreddit: subreddit, "posts.postid": postid }, { $set: { "posts.$.postStatus": "failed" } }, { new: true });
                console.log("result1: ", result1);
                return
            }

            // update the bulkSchedule status to posted and postedAt to current time
            await BulkSchedules.findOneAndUpdate(
                { userid: userid, "schedules.id": post.posts[0].postid },
                { $set: { "schedules.$.status": "posted", "schedules.$.postedAt": new Date(), "posts.$.postid": response.data.submission_ids[0] } },
            );

            // update the post status to posted and postedAt to current time
            const newPostid = response.data.submission_ids[0];
            const filter = { userid: userid, subreddit: subreddit, "posts.postid": postid };
            const update = { $set: { "posts.$.postStatus": "posted", "posts.$.postedAt": new Date(), "posts.$.postid": newPostid } };
            const options = { new: true };

            const result = await RedditModel.updateOne(filter, update, options);
            console.log(result)
        }).catch((error) => {
            console.log(error);

            // update the post status to failed
            const result1 = RedditModel.updateOne({ userid: userid, subreddit: subreddit, "posts.postid": postid }, { $set: { "posts.$.postStatus": "failed" } }, { new: true });
            console.log("result1: ", result1);
            return
        });
    } catch (error) {
        console.error(error);
    }
});

// get posts from DB using user_id, subreddit, and page_no for paginated results
router.post('/reddit/getPosts', async function (req, res, next) {
    const subreddit = req.body.subreddit;
    const page = req.body.page ? parseInt(req.body.page) : 1;
    const limit = req.body.limit ? parseInt(req.body.limit) : 10;
    const { _id } = req.user;

    console.log("subreddit: ", subreddit);
    console.log("page: ", page);
    console.log("limit: ", limit);
    console.log("_id: ", _id);

    try {
        // const result = await RedditModel.aggregate([
        //     { $match: { userid: _id, subreddit: subreddit } }, // Match the subreddit ID
        //     { $unwind: '$posts' }, // Unwind the posts array
        //     { $sort: { 'posts.postedAt': -1, 'posts.scheduledAt': -1 } }, // Sort it by date descending
        //     { $skip: (page - 1) * limit }, // Skip the appropriate number of posts based on the page and limit
        //     { $limit: limit }, // Limit the number of posts per page
        //     { $group: { _id: '$_id', posts: { $push: '$posts' } } } // Regroup the posts into an array
        // ]);

        // console.log("result: ", result);
        // const posts = result.length > 0 ? result[0].posts : []; // Extract the posts array from the result

        const [totalCountResult, postsResult] = await Promise.all([
            RedditModel.aggregate([
                { $match: { userid: _id, subreddit: subreddit } }, // Match the subreddit ID
                { $unwind: '$posts' }, // Unwind the posts array
                { $group: { _id: null, count: { $sum: 1 } } }, // Get the total count of posts
            ]),
            RedditModel.aggregate([
                { $match: { userid: _id, subreddit: subreddit } }, // Match the subreddit ID
                { $unwind: '$posts' }, // Unwind the posts array
                { $sort: { 'posts.postedAt': -1, 'posts.scheduledAt': -1 } }, // Sort it by date descending
                { $skip: (page - 1) * limit }, // Skip the appropriate number of posts based on the page and limit
                { $limit: limit }, // Limit the number of posts per page
                { $group: { _id: '$_id', posts: { $push: '$posts' } } }, // Regroup the posts into an array
            ]),
        ]);

        const totalCount = totalCountResult.length > 0 ? totalCountResult[0].count : 0; // Extract the total count of posts
        const posts = postsResult.length > 0 ? postsResult[0].posts : []; // Extract the paginated posts

        res.status(200).json({ totalCount, posts });

        // res.status(200).json(posts); // Send the paginated posts as a JSON response
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch paginated posts' });
    }
});

// save Page visibility in DB
router.post('/reddit/savePageVisibility', async function (req, res, next) {
    // get the subredditid and the bool visible
    const { subredditConfig } = req.body;
    console.log("SUBREDDIT CONFIG: ", subredditConfig);

    const updatedData = subredditConfig.map((doc) => {
        return {
            updateOne: {
                filter: { subredditid: doc.id },
                update: { is_visible: doc.is_visible },
                upsert: false // optional - if you want to create the document if it doesn't exist
            }
        }
    })

    RedditModel.bulkWrite(updatedData, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.log("Updated subreddit visibility: ", result);
            res.status(200).send("Updated subreddit visibility");
        }
    })

    // res.status(200).send("Updated subreddit visibility");
});

// create Subreddit using PRAW API
router.post('/reddit/v2/createSubreddit', async function (req, res, next) {

    // get the access token and refresh token from the DB
    const social = await Social.findOne({ userid: req.user._id, platform: "reddit" });
    console.log(social);
    const { accessToken, refreshToken } = social;

    // make axios POST to localhost:6000/create-subreddit

    const form = new FormData();
    form.append('subreddit_name', req.body.name);
    form.append('subreddit_title', req.body.title);
    form.append('subreddit_description', req.body.description ? req.body.description : "");
    form.append('access_token', accessToken)
    form.append('refresh_token', refreshToken)

    const config = {
        method: 'post',
        url: 'http://localhost:7000/createSubreddit',
        headers: {
            ...form.getHeaders()
        },
        data: form
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });


});

router.post('/imgtest', upload.single('image'), async function (req, res, next) {
    console.log(req.file);
    const redditImageUploader = new RedditImageUploader({
        token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0MDAzNDQ3LCJqdGkiOiIzMTQ2MDI5NjQ0ODAzMy1HVk1CanNaMHlwbVM4bDRqOEQyMDZ5TmtDejZZX3ciLCJjaWQiOiJselllSV9iOUNucGQyNEpMNVAxYU5RIiwibGlkIjoidDJfYjVnbnM4MnNoIiwiYWlkIjoidDJfYjVnbnM4MnNoIiwibGNhIjoxNjgzOTE2NjY4MTk3LCJzY3AiOiJlSnhFalYwT2d6QU1nLV9pNTk1bzJrTkxReGVORXBTRVR0eC1DakR0S1RfLWJEX3c0VGRUWlVmQ3dvTjZYbk1qSkZnZU1VSld5aFVKWFdwY1NMajVJUjVJUDJ3dlNyV3lXeGozWXBOeUNXbFRIdG1wazFsdVpGZklKT3ZNRFFuXzNFWGF0V3hpZm1QemtsbFBhaE9OdXRfRDl0TFBmcTYwT3Z1QmhCZWJpeDU0ZmdNQUFQX19XNkJIb0EiLCJyY2lkIjoicjRxTEJMcUVzVldjb3VRNGRoWlpGTkVMcFFJd1dBUEprZTBkU1VhTFpYQSJ9.NzC4cFiVtTCY6Vm_j3joN_TazwTQeF_2kg-9qPXfKDLw2uhtTFJrgKJE1PFTxV3QZ05NB8_RylwvRpn-XdTHc-vTQdrWuypKGOSFV5sfIH2tEaoa4cmQi1-7Swu7VixSZqk_F1LIz61IkCeD2PpRnVu-6xzyNBn49QPJngE2yC0OBfUWx5w0yrv6g4fkI4s7R7zn3ToBYo0Wv3SvDicsj4hV5nGsCsJMdfIF9gfnIonU06FxR2ZDsPgtEfUqILatr1lUsdA5TNzNNI6CKdlFkXmP1kiz-wqjbLj2GLq9WZzNtsPnHUTjOr_FU8__s2UHpljouzeV0C8jr4Vd3MWK7g',
        userAgent: 'bot:[1234]:v1.0.0 (by /u/[Plane-oven4120]) Uploading image to submit it later'
    })

    const { imageURL, webSocketURL } = await redditImageUploader.uploadMedia(req.file.path)
    console.log('Submit this url as link post to any subreddit:', imageURL)
    res.send('Image uploaded');
});

router.get('/reddit', async function (req, res, next) {
    // Check if user is logged in and has reddit credentials and token is not expired
    if (!req.user) {
        return res.status(401).send('User not logged in.');
    }
    console.log("USER ID: ", req.user._id);
    Social.findOne({ userid: req.user._id, platform: 'reddit' }, async function (err, social) {
        if (err) {
            return res.status(500).send('Error on the server.');
        }
        if (!social) {
            return res.status(404).send('No reddit credentials found.');
        }
        else {
            // Check if token is expired (token expires in 24 hour after updatedAt)
            const now = new Date();
            const diff = now - social.updatedAt;
            const diffInHours = diff / (1000 * 60 * 60);
            let access_token = social.accessToken;
            if (diffInHours > 24) {
                // Refresh and update the token
                const { refreshToken } = social;

                let headersList = {
                    "Accept": "*/*",
                    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                    "Authorization": "Basic bHpZZUlfYjlDbnBkMjRKTDVQMWFOUTphR29TNnEwUll2Ukp0Z3lWM3VVZFc0SU9ZVVd1UWc=",
                }

                let formdata = new FormData();
                formdata.append("grant_type", "refresh_token");
                formdata.append("refresh_token", refreshToken);

                let bodyContent = formdata;

                let reqOptions = {
                    url: "https://www.reddit.com/api/v1/access_token",
                    method: "POST",
                    headers: headersList,
                    data: bodyContent,
                }

                let response = await axios.request(reqOptions);
                console.log(response.data);

                access_token = response.data.access_token;

                // update the access token in the database
                let resp = await Social.findOneAndUpdate({ userid: req.user._id, platform: 'reddit' }, { $set: { accessToken: access_token, refreshToken: refreshToken } });
                console.log("resp: ", resp);
            }

            // send the user profile and subreddit list
            let profile = {
                username: social.username,
                profilePic: social.profilePic,
                bannerPic: social.bannerPic,
                handle: social.handle,
                updatedAt: social.updatedAt,
            };
            let subreddits = [];

            // get the list of subreddits from DB apply projection to get only the subreddit name
            let reddits = await RedditModel.find({ userid: req.user._id }, { subreddit: 1, title: 1, description: 1, icon: 1, _id: 0, banner: 1, subredditid: 1, is_mod: 1, is_visible: 1 });
            console.log("reddits: ", reddits);

            // if the reddits is empty, then fetch the list of subreddits from reddit
            if (reddits.length === 0) {
                let headersList = {
                    "Accept": "*/*",
                    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                    "Authorization": "Bearer " + access_token,
                }

                const resp2 = await axios.get('https://oauth.reddit.com/subreddits/mine/subscriber', { headers: headersList });

                // check for successful response
                if (resp2.status !== 200) {
                    return res.status(500).send(`Failed to fetch Reddit subreddits with status code: ${resp2.status}`);
                } else {

                    // save the data in database
                    const subreddits = [];
                    console.log("Access Token: ", access_token)
                    console.log(resp2.data)

                    for (let i = 0; i < resp2.data.data.children.length; i++) {
                        const subreddit = resp2.data.data.children[i].data;
                        subreddits.push({
                            userid: req.user._id,
                            subreddit: subreddit.display_name,
                            title: subreddit.title,
                            description: subreddit.public_description,
                            icon: subreddit.icon_img,
                            banner: subreddit.banner_img,
                            subredditid: subreddit.name,
                            is_mod: subreddit.user_is_moderator,
                        });
                    }

                    console.log("subreddits: ", subreddits);
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
                    }).catch(function (error) {
                        console.log(error)      // Failure
                    });
                }

                // get the list of subreddits from DB apply projection to get only the subreddit name
                reddits = await RedditModel.find({ userid: req.user._id }, { subreddit: 1, title: 1, description: 1, icon: 1, _id: 0, banner: 1, subredditid: 1, is_mod: 1, is_visible: 1 });
                console.log("reddits: ", reddits);

                res.status(200).send({ profile: profile, subreddits: reddits });
            }
            else {
                res.status(200).send({ profile: profile, subreddits: reddits });
            }
        }
    });
});

// Delete the Social credentials
router.delete('/reddit/me', async function (req, res, next) {
    try {
        const social = await Social.findOneAndDelete({ userid: req.user._id, username: req.body.username, platform: 'reddit' });
        if (!social) {
            return res.status(404).send('No Reddit credentials found');
        } else {
            return res.status(200).send('Reddit credentials deleted successfully');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
});

router.get('/reddit/me', async function (req, res, next) {
    try {
        console.log("Req.user: ", req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile?.profile)

        if (cachedProfile) {
            console.log('Using cached Reddit profile');
            return res.status(200).send({ profile: cachedProfile?.profile });
        }

        // get the access token from the database on user id
        const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
        if (!creds) {
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
            if (response.status !== 200) {
                throw new Error(`Failed to fetch Reddit profile with status code: ${response.status}`);
            }

            const profile = response.data;
            cache.put(cacheKey, { "profile": profile, "accessToken": access_token }, 1000 * 60 * 5); // cache for 5 minutes

            // return the user profile
            res.status(200).send({ profile });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch Reddit profile');
    }
});

//Create a subreddit
router.post('/reddit/createSubreddit', async function (req, res, next) {
    try {
        console.log("Req.user: ", req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile)

        let access_token = null;
        let uid = null;

        if (cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
            uid = cachedProfile.username;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if (!creds) {
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
                uid = creds.username;
            }
        }

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer " + access_token,
        }

        let formdata = new FormData();
        formdata.append("name", "TestSubRedditAPI22");
        formdata.append("title", "My New Subreddit API2");
        formdata.append("public_description", "Testing API, plz delete me");
        formdata.append("type", "public");
        formdata.append("lang", "en");
        formdata.append("link_type", "any");

        let bodyContent = formdata;

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
        if (errors.length > 0) {
            // If there are errors
            console.log('There are errors'); // Print that there are errors
            return res.status(500).send({ error: errors[0] }); // Send the errors to the client
        }

        // check for successful response
        if (response.status !== 200) {
            res.status(500).send(`Failed to create subreddit with status code: ${response.status}`);
        }

        //console.log("response: ",response);

        res.status(200).send("ok");
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch LinkedIn profile');
    }
});

//search for subreddits
router.post('/reddit/searchSubreddit', async function (req, res, next) {
    try {
        const { subreddit } = req.query;
        console.log("Req.user: ", req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile)

        let access_token = null;
        let uid = null;

        if (cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
            uid = cachedProfile.username;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if (!creds) {
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
                uid = creds.username;
            }
        }

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer " + access_token,
        }

        let reqOptions = {
            url: "https://oauth.reddit.com/api/search_subreddits",
            method: "POST",
            headers: headersList,
            params: {
                "query": subreddit,
            }
        }

        let response = await axios.request(reqOptions);

        // check for successful response
        if (response.status !== 200) {
            res.status(500).send(`Failed to search subreddit with status code: ${response.status}`);
        }

        //console.log("response: ",response);

        res.status(200).send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch subreddits');
    }
});

// get and load subreddits
router.get('/reddit/getSubreddits', async function (req, res, next) {
    try {
        console.log("Req.user: ", req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile)

        // check if we have subreddits saved in database
        // const resp = await RedditModel.find({ userid: req.user._id });
        // if(resp.length > 0) {
        //     console.log('Using cached Reddit subreddits');
        //     return res.status(200).send({ subreddits: resp });
        // }

        let access_token = null;

        if (cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if (!creds) {
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
            }
        }

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer " + access_token,
        }

        const resp2 = await axios.get('https://oauth.reddit.com/subreddits/mine/subscriber', { headers: headersList });

        // check for successful response
        if (resp2.status !== 200) {
            return res.status(500).send(`Failed to fetch Reddit subreddits with status code: ${resp2.status}`);
        }

        // save the data in database
        const subreddits = [];

        for (let i = 0; i < resp2.data.data.children.length; i++) {
            const subreddit = resp2.data.data.children[i].data;
            subreddits.push({
                userid: req.user._id,
                subreddit: subreddit.display_name,
                title: subreddit.title,
                description: subreddit.public_description,
                icon: subreddit.icon_img,
                banner: subreddit.banner_img,
                subredditid: subreddit.name,
                is_mod: subreddit.user_is_moderator,
            });
        }

        console.log("subreddits: ", subreddits);
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
        }).catch(function (error) {
            console.log(error)      // Failure
        });

        res.status(200).send({ subreddits: subreddits });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch Reddit subreddits');
    }
});

// load posts for a subreddit
router.get('/reddit/getPosts', async function (req, res, next) {
    try {
        const { subreddit } = req.query;
        console.log("Req.user: ", req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile)

        let access_token = null;

        if (cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if (!creds) {
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
            }
        }

        const resp = await axios.get(`https://oauth.reddit.com/r/${subreddit}/top`, {
            headers: {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": "Bearer " + access_token,
            },
            params: {
                t: 'day',
                limit: 10,
            }
        });

        console.log("resp: ", resp);
        // check for successful response
        if (resp.status !== 200) {
            return res.status(500).send(`Failed to fetch Reddit posts with status code: ${resp.status}`);
        }

        res.status(200).send({ posts: resp.data.data.children });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch Reddit posts');
    }
});

//Delete a subreddit
router.delete('/reddit/deleteSubreddit', async function (req, res, next) {
    try {
        const { subreddit } = req.query;
        console.log("Req.user: ", req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile)

        let access_token = null;
        let uid = null;

        if (cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
            uid = cachedProfile.username;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if (!creds) {
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
router.delete('/reddit/deletePost', async function (req, res, next) {
    try {
        const { subreddit, postid } = req.body;
        console.log("Req.user: ", req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile)

        let access_token = null;
        let uid = null;

        if (cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
            uid = cachedProfile.username;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if (!creds) {
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

        console.log("response: ", response);
        if (response.status !== 200) {
            return res.status(500).send(`Failed to delete Reddit post with status code: ${response.status}`);
        }

        // delete from database
        let resp = await RedditPost.updateOne(
            { userid: req.user._id, platform: 'reddit' },
            { $pull: { posts: { postid: postid } } }
        );

        if (resp.nModified === 0) {
            return res.status(500).send('Failed to delete Reddit post from database');
        }

        res.status(200).send({ message: 'Successfully deleted Reddit post' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete Reddit post');
    }
});

//Create and send a post to a subreddit
router.post('/reddit/createPost', async function (req, res, next) {
    try {
        const { subreddit, title, text } = req.body;
        console.log("Req.user: ", req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile)

        let access_token = null;
        let uid = null;

        if (cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
            uid = cachedProfile.username;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if (!creds) {
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
            "Authorization": "Bearer " + access_token,
        }

        let formdata = new FormData();
        formdata.append("api_type", "json");
        formdata.append("kind", "self");
        formdata.append("sr", subreddit);
        formdata.append("title", title);
        formdata.append("text", text);

        let bodyContent = formdata;

        let reqOptions = {
            url: "https://oauth.reddit.com/api/submit",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);
        console.log(response.data);

        if (response.status !== 200) {
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
        console.log("res: ", postResp);

        postResp.status(200).send("Post Sent");
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create post');
    }
});

// send a post with image or video to a subreddit
router.post('/reddit/createPostWithMedia', upload.single('file'), async function (req, res, next) {
    try {
        const { subreddit, title, text, media } = req.body;
        const { originalname, path: Imgpath } = req.file;

        console.log("Req.user: ", req.user._id);
        const cacheKey = `reddit_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile)

        let access_token = null;
        let uid = null;

        if (cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
            uid = cachedProfile.username;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'reddit' });
            if (!creds) {
                return res.status(404).send('No Reddit credentials found');
            } else {
                access_token = creds.accessToken;
                uid = creds.username;
                //cache.put(cacheKey, profile, 1000 * 60 * 5);
            }
        }

        // upload to imgur
        // let formData = new FormData();
        // formData.append((media == "image")? "image":"video", fs.createReadStream(Imgpath))

        // let resp = await axios.post('https://api.imgur.com/3/upload', formData, {
        //     headers: {
        //         "Authorization": `Client-ID 6d6ea978e75e998`
        //     }
        // });

        // console.log("resp: ",resp);
        let mediaLink = "https://i.imgur.com/4170y2C.mp4"

        // create post
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer " + access_token,
        }

        let formdata = new FormData();
        formdata.append("api_type", "json");
        formdata.append("kind", (media == "image") ? "image" : "video");
        formdata.append("sr", subreddit);
        formdata.append("title", title);
        formdata.append("text", text);
        formdata.append("url", mediaLink);
        formdata.append("video_poster_url", "https://i.imgur.com/9FNd83B.png");

        let bodyContent = formdata;

        let reqOptions = {
            url: "https://oauth.reddit.com/api/submit",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);
        console.log(response.data.json);

        if (response.status !== 200) {
            res.status(500).send(`Failed to create post with status code: ${response.status}`);
        }

        // push into the database
        // var post = {
        //     postid: response.data.json.data.id,
        //     title: title,
        //     text: text,
        //     postStatus: "posted"
        // }
        // console.log(post)

        // const postResp = await RedditModel.findOneAndUpdate({ userid: req.user._id, subreddit: subreddit.split('/')[1] }, { $push: { posts: post } }, { upsert: true });
        // console.log("res: ",postResp);

        res.status(200).send("Post Sent");
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create post');
    }
});

// Refresh the access token
router.post('/reddit/refreshToken', async function (req, res, next) {
    try {
        let userID = req.user._id;
        const creds = await Social.findOne({ userid: userID, platform: 'reddit' });
        if (!creds) {
            return res.status(404).send('No Reddit credentials found');
        } else {
            const { refreshToken } = creds;

            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": "Basic bHpZZUlfYjlDbnBkMjRKTDVQMWFOUTphR29TNnEwUll2Ukp0Z3lWM3VVZFc0SU9ZVVd1UWc=",
            }

            let formdata = new FormData();
            formdata.append("grant_type", "refresh_token");
            formdata.append("refresh_token", refreshToken);

            let bodyContent = formdata;

            let reqOptions = {
                url: "https://www.reddit.com/api/v1/access_token",
                method: "POST",
                headers: headersList,
                data: bodyContent,
            }

            let response = await axios.request(reqOptions);
            console.log(response.data);

            const { access_token, refresh_token } = response.data;

            // update the access token in the database
            let resp = await Social.findOneAndUpdate({ userid: userID, platform: 'reddit' }, { $set: { accessToken: access_token, refreshToken: refresh_token } });
            console.log("resp: ", resp);

            res.status(200).send("Token Refreshed");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to refresh token');
    }
});

//Schedule Post
router.post('/reddit/schedulePost', async function (req, res, next) {
    try {
        const { subreddit, title, text, scheduledTime } = req.body;
        console.log("Req.user: ", req.user._id);
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
            console.log("data: ", data);
        }).catch((err) => {
            console.log("err: ", err);
            return res.status(500).send("Failed to schedule post");
        })

        res.status(200).send("Post Scheduled");
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create post');
    }
});

// send scheduled post
router.post('/reddit/sendScheduledPost', async function (req, res, next) {
    try {
        const { subreddit, userid, postid } = req.body;
        console.log("Req.user: ", userid);
        const cacheKey = `reddit_${userid}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile)
        console.log("subreddit: ", subreddit);
        console.log("postid: ", postid);
        var access_token = null;
        res.status(200).send("Post Sent");

        // get the post from the database on user id and subreddit and postid, return the particular post
        const post = await RedditModel.findOne({ userid: userid, subreddit: subreddit, "posts.postid": postid }, { "posts.$": 1 });
        console.log("post: ", post);

        // get the access token from the database on user id
        if (cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: userid, platform: 'reddit' });
            if (!creds) {
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
            "Authorization": "Bearer " + access_token
        }

        let formdata = new FormData();
        formdata.append("api_type", "json");
        formdata.append("kind", "self");
        formdata.append("sr", "r/" + subreddit);
        formdata.append("title", post.posts[0].title);
        formdata.append("text", post.posts[0].text);

        let bodyContent = formdata;

        let reqOptions = {
            url: "https://oauth.reddit.com/api/submit",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);
        // response = {
        //     status: 200,
        //     data: {
        //         json: {
        //             data: {
        //                 id: "test"
        //             }
        //         }
        //     }
        // }
        console.log(response.data);
        var newPostid = response.data.json.data.id;

        if (response.status !== 200) {
            console.log(`Failed to create post with status code: ${response.status}`);
            // update the post status to failed
            const result1 = await RedditModel.updateOne({ userid: userid, subreddit: subreddit, "posts.postid": postid }, { $set: { "posts.$.postStatus": "failed" } }, { new: true });
            console.log("result1: ", result1);
            return
        }

        // update the post status to posted
        const filter = { userid: userid, subreddit: subreddit, "posts.postid": postid };
        const update = { $set: { "posts.$.postStatus": "posted", "posts.$.postid": newPostid } };
        const options = { new: true };

        const result = await RedditModel.updateOne(filter, update, options);
        console.log("result: ", result);

    } catch (error) {
        console.error(error);
        // res.status(500).send('Failed to send scheduled post');
    }
});

// cancel schedule and publish now
router.post('/reddit/cancelSchedulePost', async function (req, res, next) {
    try {
        const { subreddit, userid, postid } = req.body;
        console.log("Req.user: ", userid);
        const cacheKey = `reddit_${userid}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile)
        console.log("subreddit: ", subreddit);
        console.log("postid: ", postid);
        var access_token = null;

        // delete the schedule from the database on user id and subreddit and postid
        const results = await ScheduleModel.deleteOne({ userid: userid, subreddit: subreddit, postid: postid });
        console.log("results: ", results);

        // get the post from the database on user id and subreddit and postid, return the particular post
        const post = await RedditModel.findOne({ userid: userid, subreddit: subreddit, "posts.postid": postid }, { "posts.$": 1 });
        console.log("post: ", post);

        // get the access token from the database on user id
        if (cachedProfile) {
            console.log('Using cached Reddit profile');
            access_token = cachedProfile.accessToken;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: userid, platform: 'reddit' });
            if (!creds) {
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
            "Authorization": "Bearer " + access_token
        }

        let formdata = new FormData();
        formdata.append("api_type", "json");
        formdata.append("kind", "self");
        formdata.append("sr", "r/" + subreddit);
        formdata.append("title", post.posts[0].title);
        formdata.append("text", post.posts[0].text);

        let bodyContent = formdata;

        let reqOptions = {
            url: "https://oauth.reddit.com/api/submit",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);
        console.log(response.data);
        var newPostid = response.data.json.data.id;

        if (response.status !== 200) {
            console.log(`Failed to create post with status code: ${response.status}`);
            // update the post status to failed
            const result1 = await RedditModel.updateOne({ userid: userid, subreddit: subreddit, "posts.postid": postid }, { $set: { "posts.$.postStatus": "failed" } }, { new: true });
            console.log("result1: ", result1);
            return
        }

        // update the post status to posted
        const filter = { userid: userid, subreddit: subreddit, "posts.postid": postid };
        const update = { $set: { "posts.$.postStatus": "posted", "posts.$.postid": newPostid } };
        const options = { new: true };

        const result = await RedditModel.updateOne(filter, update, options);
        console.log("result: ", result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send scheduled post');
    }
});

// get comments
router.get('/reddit/comments', async function (req, res, next) {
    try {
        const { postid } = req.query;

        // get comments
        let response = await axios.get(`https://www.reddit.com/comments/${postid}.json`, {
            headers: {
                "Accept": "*/*",
            }
        });

        //console.log(response.data[1].data.children[0]);
        var commentsData = [{}]
        for (var a in response.data[1].data.children) {
            console.log(response.data[1].data.children[a].data.body);
            commentsData.push({
                body: response.data[1].data.children[a].data.body,
            })
        }

        console.log(commentsData)
        res.status(200).send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch comments');
    }
});

//----------------------------- Linkedin -----------------------------
router.get('/linkedin', function (req, res, next) {
    res.status(200).send('Linkedin API');
});

router.get('/linkedin/me', async function (req, res, next) {
    try {
        console.log("Req.user: ", req.user._id);
        const cacheKey = `linkedin_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile)

        if (cachedProfile) {
            console.log('Using cached LinkedIn profile');
            return res.status(200).send({ profile: cachedProfile });
        }

        // get the access token from the database on user id
        const creds = await Social.findOne({ userid: req.user._id, platform: 'linkedin' });
        if (!creds) {
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
            if (response.status !== 200) {
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

router.post('/linkedin/posts', async function (req, res, next) {
    // Text post

    const { text } = req.body;
    if (!text) {
        return res.status(400).send('No text provided');
    }
    try {
        console.log("Req.user: ", req.user._id);
        const cacheKey = `linkedin_${req.user._id}`;
        const cachedProfile = cache.get(cacheKey);
        console.log("cachedProfile: ", cachedProfile)
        let access_token = null;
        let uid = null;

        if (cachedProfile) {
            console.log('Using cached LinkedIn profile');
            access_token = cachedProfile.accessToken;
            uid = cachedProfile.handle;
        } else {
            // get the access token from the database on user id
            const creds = await Social.findOne({ userid: req.user._id, platform: 'linkedin' });
            if (!creds) {
                return res.status(404).send('No LinkedIn credentials found');
            } else {
                access_token = creds.accessToken;
                uid = creds.handle;
            }
        }

        // craft the post
        const post = {
            "author": "urn:li:person:" + uid,
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
        if (response.status !== 201) {
            throw new Error(`Failed to post to LinkedIn with status code: ${response.status}`);
        } else {
            res.status(200).send('Post successful');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch LinkedIn profile');
    }
});

router.post('/linkedin/imagepost', upload.single('file'), async function (req, res, next) {
    // Image post
    const { originalname, path: Imgpath } = req.file;
    const { text } = req.body;

    console.log("filename: ", originalname);
    console.log("path: ", Imgpath);
    console.log("text: ", text);

    //validate image exists
    if (!originalname || !path) {
        return res.status(400).send('No image provided');
    }

    // get credentials
    var userID = "6416dcf3cc312c2ed3fb1aa2"
    console.log("Req.user: ", userID);
    const cacheKey = `linkedin_${userID}`;
    const cachedProfile = cache.get(cacheKey);
    console.log("cachedProfile: ", cachedProfile)
    let access_token = null;
    let uid = null;

    if (cachedProfile) {
        console.log('Using cached LinkedIn profile');
        access_token = cachedProfile.accessToken;
        uid = cachedProfile.handle;
    } else {
        // get the access token from the database on user id
        const creds = await Social.findOne({ userid: userID, platform: 'linkedin' });
        if (!creds) {
            return res.status(404).send('No LinkedIn credentials found');
        } else {
            access_token = creds.accessToken;
            uid = creds.handle;
        }
    }

    //generate upload url https://api.linkedin.com/rest/assets?action=registerUpload
    const response = await axios.post('https://api.linkedin.com/rest/assets?action=registerUpload',
        {
            "registerUploadRequest": {
                "owner": "urn:li:person:" + uid,
                "recipes": [
                    "urn:li:digitalmediaRecipe:feedshare-image"
                ],
                "serviceRelationships": [
                    {
                        "identifier": "urn:li:userGeneratedContent",
                        "relationshipType": "OWNER"
                    }
                ],
                "supportedUploadMechanism": [
                    "SYNCHRONOUS_UPLOAD"
                ]
            }
        },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
                'LinkedIn-Version': '202211'
            }
        });

    if (response.status !== 200) {
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
        if (resp.status !== 201) {
            return res.status(500).send('Failed to upload image');
        }

        // craft the post
        const post = {
            "author": "urn:li:person:" + uid,
            "commentary": text,
            "visibility": "PUBLIC",
            "distribution": {
                "feedDistribution": "MAIN_FEED",
                "targetEntities": [],
                "thirdPartyDistributionChannels": []
            },
            "content": {
                "media": {
                    "title": text,
                    "id": "urn:li:image:" + asset.split(':')[3],
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
        if (response2.status !== 201) {
            return res.status(500).send('Failed to post to LinkedIn');
        }

        console.log("response2: ", response2.headers["x-restli-id"]);
    }

    res.status(200).send('Image post successful');
});

router.post('/linkedin/videopost', uploadVideo.single('file'), async function (req, res, next) {
    // Image post
    const { originalname, path: Vidpath } = req.file;
    const { text } = req.body;
    const chunkSize = 4194303; // 4 MB

    console.log("filename: ", originalname);
    console.log("path: ", Vidpath);
    console.log("text: ", text);

    var data = fs.createReadStream(Vidpath, { start: 0, end: 4194303 });
    console.log("data1: ", data)
    data = fs.createReadStream(Vidpath, { start: 4194304, end: 5001676 });
    console.log("data2: ", data)

    //validate image exists
    if (!originalname || !path) {
        return res.status(400).send('No image provided');
    }

    // get credentials
    var userID = "6416dcf3cc312c2ed3fb1aa2"
    console.log("Req.user: ", userID);
    const cacheKey = `linkedin_${userID}`;
    const cachedProfile = cache.get(cacheKey);
    console.log("cachedProfile: ", cachedProfile)
    let access_token = null;
    let uid = null;

    if (cachedProfile) {
        console.log('Using cached LinkedIn profile');
        access_token = cachedProfile.accessToken;
        uid = cachedProfile.handle;
    } else {
        // get the access token from the database on user id
        const creds = await Social.findOne({ userid: userID, platform: 'linkedin' });
        if (!creds) {
            return res.status(404).send('No LinkedIn credentials found');
        } else {
            access_token = creds.accessToken;
            uid = creds.handle;
        }
    }

    //generate upload url https://api.linkedin.com/rest/assets?action=registerUpload
    const response = await axios.post('https://api.linkedin.com/rest/videos?action=initializeUpload',
        {
            "initializeUploadRequest": {
                "owner": "urn:li:person:" + uid,
                "fileSizeBytes": fs.statSync(Vidpath).size,
                "uploadCaptions": false,
                "uploadThumbnail": false
            }
        },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
                'LinkedIn-Version': '202211'
            }
        });

    console.log("response is: ", response.data.value.uploadInstructions)
    if (response.status !== 200) {
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

        for (var urlval in uploadUrl) {
            console.log("url: ", uploadUrl[urlval].uploadUrl)
            console.log("start", uploadUrl[urlval].firstByte)
            console.log("end", uploadUrl[urlval].lastByte)

            const form = new FormData();
            form.append('file', fs.createReadStream(Vidpath, { start: uploadUrl[urlval].firstByte, end: uploadUrl[urlval].lastByte }));

            const request_config = {
                headers: {
                    "Accept": "*/*",
                    'Authorization': `Bearer ${access_token}`,
                    "LinkedIn-Version": "202211",
                    "Content-Type": "application/octet-stream",
                    ...form.getHeaders()
                }
            };

            console.log("form: ", form)
            console.log("request_config: ", request_config)
            console.log("uploadUrl: ", uploadUrl[urlval].uploadUrl)
            console.log("Vidpath: ", Vidpath)
            const resp = await axios.post(uploadUrl[urlval].uploadUrl, form, request_config);

            if (resp.status !== 200) {
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
                    'LinkedIn-Version': '202211',
                    "X-Restli-Protocol-Version": '2.0.0'
                }
            });
        console.log("response2: ", response2)

        if (response2.status !== 200) {
            console.log("response2: ", response2)
            return res.status(500).send('Failed to finalize upload');
        }

        // craft the post
        const post = {
            "author": "urn:li:person:" + uid,
            "commentary": text,
            "visibility": "PUBLIC",
            "distribution": {
                "feedDistribution": "MAIN_FEED",
                "targetEntities": [],
                "thirdPartyDistributionChannels": []
            },
            "content": {
                "media": {
                    "title": text,
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
        if (response3.status !== 201) {
            return res.status(500).send('Failed to post to LinkedIn');
        }

        console.log("response2: ", response3.headers["x-restli-id"]);
        console.log(asset)
    }
    res.status(200).send('Image post successful');
});

router.delete('/linkedin/post', async function (req, res, next) {
    const posturn = encodeURIComponent(req.body.posturn);

    var userID = "6416dcf3cc312c2ed3fb1aa2"
    console.log("Req.user: ", userID);
    const cacheKey = `linkedin_${userID}`;
    const cachedProfile = cache.get(cacheKey);
    console.log("cachedProfile: ", cachedProfile)
    let access_token = null;
    let uid = null;

    if (cachedProfile) {
        console.log('Using cached LinkedIn profile');
        access_token = cachedProfile.accessToken;
        uid = cachedProfile.handle;
    } else {
        // get the access token from the database on user id
        const creds = await Social.findOne({ userid: userID, platform: 'linkedin' });
        if (!creds) {
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
    if (response.status !== 204) {
        return res.status(500).send('Failed to delete post');
    }

    res.status(200).send('Post deleted successfully');
});

//----------------------------- Tiktok -----------------------------
router.get('/tiktok', function (req, res, next) {
    res.send('Tiktok API');
});

//----------------------------- Youtube -----------------------------
router.get('/youtube', function (req, res, next) {
    res.send('Youtube API');
});

//----------------------------- Instagram -----------------------------
router.get('/instagram', function (req, res, next) {
    res.send('Instagram API');
});

//----------------------------- Pinterest -----------------------------
router.get('/pinterest', function (req, res, next) {
    res.send('Pinterest API');
});

//----------------------------- Facebook -----------------------------
router.get('/facebook', function (req, res, next) {
    res.send('Facebook API');
});

//----------------------------- Dev.to -----------------------------
router.get('/devto', function (req, res, next) {
    res.send('Dev.to API');
});

module.exports = router;