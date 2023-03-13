var express = require("express");
var router = express.Router()
var messages = require("../models/MessageSchema");


router.get("/getMessages", (req, res, next)=>{
    console.log("chat router Called..... getting the messages")
})

router.post("/addMessage", async(req, res, next)=>{
    try{
        const {to,from, text} = req.body;
        const data = await messages.create(
            req.body
        )
        res.status(200).json({
            status: "success"
        })


    }catch(e){
        res.status(500).json({
            status: "error"
        })

    }
})

router.put("/editMessage/:id", (req, res, next)=>{
    console.log("editing the message")
})

router.delete("/deleteMessage/:id", (req, res, next)=>{
    console.log("deleting the message")
})

module.exports = router;