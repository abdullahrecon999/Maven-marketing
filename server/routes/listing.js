var express = require('express');
const Listing = require("../models/listing")


var router = express.Router()



router.get("/getlistingdetails/:id", async(req, res)=>{
    const id = req.params.id
    console.log('hit')
    try{
        const data = await Listing.findOne({_id:id})
        console.log(data)
        res.status(200).json({
            status:"success",
            data: data
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            status:"error",
            
        })

    }
})

module.exports = router;