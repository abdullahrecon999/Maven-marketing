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
    

},{
    timestamps: true
})