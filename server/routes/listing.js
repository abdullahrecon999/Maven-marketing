var express = require('express');
const Listing = require("../models/listing")
const User = require('../models/User');


var router = express.Router()

router.get("/getalllisting", async (req, res)=>{
    try{
        const {page, limit, search, sort, category, country, language, socialMediaHandles, minFollowers, maxFollowers} = req.query
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 10,
            sort: {},
            collation: {
              locale: 'en'
            }
          }
          const query = {}
          if(search){
            query.$and = [
              {
                $or: [
                  {title: {$regex: search, $options: 'i'}},
                  {description: {$regex: search, $options: 'i'}},
                  {platform: {$regex: search, $options: 'i'}},
                ]
              }
            ]
          }
        const data = await Listing.paginate({...query}, options)
        res.status(200).json({
            status: "success",
            data: data
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            status:"error",
            
        })
    }
})

router.post("/create", async (req, res)=>{
    const databody = req.body
    try{
        const data = await User.findOne({_id:databody.owner})
        if (Object.keys(data).length!==0){
            await Listing.create({...databody, registered:true, profilePic: data.photo})
        res.status(200).json({
            status: "success",
           
        })
        }
    }catch(e){
        console.log(e)
        res.status(500).json({
            status:"error",
            
        })
    }
})

router.get("/delete/:id", async(req, res)=>{
    const id = req.params.id
    try{
        await Listing.deleteOne({_id:id})
        res.status(200).json({
            status: "success",
           
        })
    }catch{
        res.status(500).json({
            status:"error",
            
        })
    }
})

router.get("/getmylisting/:id", async (req, res)=>{
    try{
        const id = req.params.id
        const data = await Listing.find({owner: id})
        res.status(200).json({
            status:"success",
            data: data
        })
    }catch(e){
        res.status(500).json({
            status:"error",
            
        })
    }
})

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