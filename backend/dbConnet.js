const mongoose = require("mongoose")

exports.connect = ()=>{
    mongoose.connect("mongodb+srv://hassan:hassan@fwa.0ju3u9f.mongodb.net/?retryWrites=true&w=majority").then(()=>
        console.log("ashdjshdfjasjd")
    ).catch(()=>{
        console.log("erorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    })
}