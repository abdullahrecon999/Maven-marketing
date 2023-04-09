const mongoose = require("mongoose")

const contracts = new mongoose.Schema({
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
    description: {
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
        
    },
    expired: {
        type: Boolean,
        default: false,
        
    },
    filesRef:{
        type:String,
        default: ""
    }
    

},{
    timestamps: true
})

const contract = mongoose.model('contract',contracts);

module.exports = contract;