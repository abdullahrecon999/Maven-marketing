const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');

const socialSchema = new mongoose.Schema({
    platform: {
        type: String,
    },
    handle: {
        type: String,
    },
    username: {
        type: String,
    },
    userid: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    accessTokenExpiresAt: {
        type: Date,
    },
},{ timestamps: true });

const Social = mongoose.model('Social', socialSchema);

module.exports = Social;
