var express = require("express");
var router = express.Router()
var messages = require("../models/MessageSchema");
var contact = require("../models/MessageContacts")
var Contract = require("../models/Contracts")

router.post("/addContact/",async (req,res)=>{
    const {id, contacts} = req.body
    const doc1 = {
        user: id,
        contacts: contacts
    }
    
    try{
        await contact.create(doc1)
        res.status(200).json({
            status: "success"
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            status: "error"
        })
    }

    
})

router.get("/getContacts/:id", async (req, res)=>{
    const id= req.params.id
    try{
        const data = await contact.find({user: id}).
        populate("contacts.contact","name")

        res.status(200).json({
            status: "success",
            data
        })

    }catch(e){
        res.status(500).json({
            status: "error"
        })

    }
})

router.get("/getcontractdetails/:id", async(req, res)=>{
    const id = req.params.id
    try{
        const message = await messages.findOne({_id:id})
        const data = await Contract.findOne({_id: message.contract}).populate("campaignId", ["title", "description"]).
        populate("sender","name")
        console.log(data)

        res.status(200).json({
            status: "success",
            data
        })
    }catch(e){
        res.status(500).json({
            status:"error"
        })
    }
})

router.get("/getcontractid/:id",async(req,res)=>{
    const id = req.params.id
    try{
        const data = await messages.findOne({_id:id}).select("contract")
        res.status(200).json({
            status: "success",
            data
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            status:"error"
        })
    }
})
router.post("/getMessages", async (req, res, next)=>{
    const {to, from} = req.body
    
    try{
        const data = await messages.find({users:{
            $all: [to, from]
        }}).sort({updatedAt: 1})

        const projectMessages = data.map(message=>{
            console.log(message)
            return({
                id: message["_id"],
                fromSelf : message.sender.toString() === from,
                message : message.text,
                msgType: message.msgType,
                
            })
        })
        console.log(projectMessages)

        res.status(200).json({
            status: "success",
            projectMessages
        })

    }catch(e){
        res.status(500).json({
            status: "error"
        })

    }
})

router.post("/addMessage", async(req, res, next)=>{
    try{
        
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