
const mongoose = require("mongoose");

const PlatformSchema = new mongoose.Schema({
    
    userId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
    plateform: {
        type: String,
        required: true,

    },
    url:{
        type: String,
        required: true
    },
    verified:{
        type: Boolean,
        
        default: false
    }

    
})

const plateforms = mongoose.model("plateforms", PlatformSchema)
module.exports = plateforms