const mongoose = require("mongoose")

const paymentRequests = new mongoose.Schema({
    campaignId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true
    },
    contractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contracts",
        required: true
    },
    approved: {
        type: boolean,
        default:false
    },
    amount : {
        type: String,
        required: true
    }
   
},{
    timestamps: true
})

const payment = mongoose.model('payment',paymentRequests);

module.exports = payment;