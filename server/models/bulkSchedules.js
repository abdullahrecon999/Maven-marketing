const mongoose = require('mongoose');

const bulkSchedulesSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    schedules: [
        {
            id: {
                type: String,
            },
            key: {
                type: Number,
            },
            subredditName: {
                type: String,
            },
            title: {
                type: String,
            },
            text: {
                type: String,
            },
            attcahment: {
                type: String,
            },
            status: {
                type: String,
            },
            scheduledAt: {
                type: Date,
            },
            postedAt: {
                type: Date,
            },
            error: {
                type: String,
            },
        }
    ]
}, { timestamps: true });

const BulkSchedules = mongoose.model('BulkSchedules', bulkSchedulesSchema);

module.exports = BulkSchedules;
