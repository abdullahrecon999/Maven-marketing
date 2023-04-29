const mongoose = require('mongoose');

const Schedules = new mongoose.Schema({
    // define schema fields for model 1
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    platform: {
        type: String,
        enum : ['reddit','linkedin'],
    },
    subreddit: {
        type: String,
    },
    postid: {
        type: String,
        // assign temp random string that mactches scheduled postid in socialPlatform model.
    },
    sendTime: {
        type: Date,
    },
}, { timestamps: true });

const ScheduleModel = mongoose.model('Schedules', Schedules);

module.exports = ScheduleModel