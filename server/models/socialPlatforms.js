const mongoose = require('mongoose');

const Reddit = new mongoose.Schema({
    // define schema fields for model 1
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    subreddit: {
        type: String,
    },
    subredditid: {
        type: String,
    },
    is_visible:{
        type: Boolean,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    icon: {
        type: String,
    },
    banner: {
        type: String,
    },
    is_mod: {
        type: Boolean,
    },
    posts: {
        type: [
            {
                postid: {
                    type: String,
                    // assign temp random string that mactches scheduled postid in scheduled model.
                },
                title: {
                    type: String,
                },
                text: {
                    type: String,
                },
                postStatus: {
                    type: String,
                    enum : ['scheduled','posted', 'failed'],
                },
            }
        ]
    }

});

const Linkedin = new mongoose.Schema({
    // define schema fields for model 2
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userUrn: {
        type: String,
    },
    posts: {
        type: [
            {
                postid: {
                    type: String,
                    // assign temp random string that mactches scheduled postid in scheduled model.
                },
                title: {
                    type: String,
                },
                text: {
                    type: String,
                },
                postStatus: {
                    type: String,
                    enum : ['scheduled','posted'],
                },
            }
        ]
    }
});

const RedditModel = mongoose.model('Reddit', Reddit);
const LinkedinModel = mongoose.model('Linkedin', Linkedin);

module.exports = {
    RedditModel,
    LinkedinModel
};
