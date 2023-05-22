const mongoose = require('mongoose')

const acountSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    role: {
        type : String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    }

},{timestamps:true})

const account = mongoose.model("Accounts", acountSchema)
module.exports = account;