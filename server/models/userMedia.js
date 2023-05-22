const mongoose = require('mongoose');

const Media = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    media: [
        {
            url: {
                type: String,
            },
            path: {
                type: String,
            },
            type: {
                type: String,
            },
        },
    ]
}, { timestamps: true });

module.exports = mongoose.model('Media', Media);