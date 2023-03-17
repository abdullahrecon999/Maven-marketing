const Campaign = require("../models/Campaign");
const express = require("express")
var router = express.Router();

router.get("/campaigns", async(req, res, next)=>{
    try{
      const data = await Campaign.find({status:{$ne: "draft"}}).populate("brand")
      console.log(data)
      res.status(200).json({
        status: "success",
        data
        
      })
    }catch(e){
      console.log(e)
      res.status(502).json({
        status: "error"
      })
    }
  })

  router.get("/campaigns/limit", async(req, res, next)=>{
    try{
      const data = await Campaign.find({status:{$ne: "draft"}}).limit(10).populate("brand")
      console.log(data)
      res.status(200).json({
        status: "success",
        data
        
      })
    }catch(e){
      console.log(e)
      res.status(502).json({
        status: "error"
      })
    }
  })

  router.get("/campaigns/details/:id", async(req, res, next)=>{

    const id = req.params.id

    try{
      const data = await Campaign.findOne({_id: id}).populate("brand")
      
      res.status(200).json({
        status: "success",
        data
        
      })
    }catch(e){
      console.log(e)
      res.status(502).json({
        status: "error"
      })
    }
  })

  //get campaign listing by brand. return the following fields(id, title, status, date, bannerImg)
  router.get("/campaigns/brand/:id", async(req, res, next)=>{
    try{
      const data = await Campaign.find({brand: req.params.id}).select("title status updatedAt bannerImg")
      res.status(200).json({
        status: "success",
        data
      })
    }catch(e){
      console.log(e)
      res.status(502).json({
        status: "error"
      })
    }
  })

  // create Campaign
  router.post("/create", async(req, res, next)=>{
    try{
      const data = await Campaign.create(req.body)
      res.status(200).json({
        status: "success",
        data
      })
    }catch(e){
      console.log(e)
      res.status(502).json({
        status: "error"
      })
    }
  })

  //View campaign details by its id
  router.get("/view/:id", async(req, res, next)=>{
    try{
      const data = await Campaign.findOne({_id: req.params.id})
      res.status(200).json({
        status: "success",
        data
      })
    }catch(e){
      console.log(e)
      res.status(502).json({
        status: "error"
      })
    }
  })

  // update Campaign details that have changed in body of request
  router.patch("/update/:id", async(req, res, next)=>{
    try{
      const data = await Campaign.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
      res.status(200).json({
        status: "success",
        data
      })
    }catch(e){
      console.log(e)
      res.status(502).json({
        status: "error"
      })
    }
  })

  // update Campaign details that have changed in body of request and set status to live
  router.patch("/publish/:id", async(req, res, next)=>{
    try{
      const data = await Campaign.findOneAndUpdate({_id: req.params.id}, {...req.body, status: "live"}, {new: true})
      res.status(200).json({
        status: "success",
        data
      })
    }catch(e){
      console.log(e)
      res.status(502).json({
        status: "error"
      })
    }
  })

  
  // delete Campaign
  router.delete("/delete/:id", async(req, res, next)=>{
    try{
      const data = await Campaign.findOneAndDelete({_id: req.params.id})
      res.status(200).json({
        status: "success",
        data
      })
    }catch(e){
      console.log(e)
      res.status(502).json({
        status: "error"
      })
    }
  })

  module.exports = router