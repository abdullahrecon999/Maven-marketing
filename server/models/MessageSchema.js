const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    msgType: {
        type: String,
        
        default: "text"

    },
    deleted:{
        type: Boolean,
        default: false

    },
    edited: {
        type: Boolean,
        default: false
    },
    

},
{
    timestamps: true
})

const messages = mongoose.model("message", messageSchema);

module.exports = messages