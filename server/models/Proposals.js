const mongoose = require("mongoose")

const invitesSchema = new mongoose.Schema({
    campaignId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    accepted:{
        type: Boolean,
        default: false,
    },
    rejected:{
        type: Boolean,
        default: false,

    },
    discription: {
        type: String,
        default: null,
        required: true
    },
    answers:{
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    file:{
        type: String,
    }
},{
    timestamps: true
})

const proposal = mongoose.model("bid", invitesSchema)

module.exports = proposal