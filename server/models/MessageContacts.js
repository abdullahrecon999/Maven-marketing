const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    contacts:[{
        contact: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            
            default: null,
            unique: true
        },
    }
    ]
    

},
{
    timestamps: true
})

const contactmodel = mongoose.model("contact", contactSchema);

module.exports = contactmodel