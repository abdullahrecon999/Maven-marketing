const mongoose = require('mongoose')

const transactions = new mongoose.Schema({
   userFrom : {
    type : mongoose.Types.ObjectId,
    ref: 'User',
    required :true
   },
   userTo : {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required :true
   },
   amount : 
   {
    type: Number,
    required : true},
    paymentFor: {
        type: mongoose.Types.ObjectId,
        required: true
        
    }

},{timestamps:true})

const account = mongoose.model("transation", transactions)
module.exports = account;