const mongoose = require("mongoose")

const campaign = mongoose.Schema({
    id: Number, 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    hires: {
        type: Number,
        default: 0
    },
})


module.exports = mongoose.model("campaign", campaign)
