const mongoose = require("mongoose")

const invitesSchema = new mongoose.Schema({
    campaignId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaigns",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
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
       
    },
    amount: {
        type: Number,
        default: 0,
        required: true

    }, 
    expiresAt: {
        type: Date,
        required: true,
    },
    expired: {
        type: Boolean,
        default: false,
        required: true
    }
    

},{
    timestamps: true
})