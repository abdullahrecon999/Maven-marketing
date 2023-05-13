const mongoose = require('mongoose')

const transactions = new mongoose.Schema({
   user_from : {
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
    required : true}

},{timestamps:true})

const account = mongoose.model("transation", transactions)
module.exports = account;