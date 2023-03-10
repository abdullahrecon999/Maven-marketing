const Campaings = require("../models/Campaign");
const express = require("express")
var router = express.Router();
router.get("/campaigns", async(req, res, next)=>{
    try{
      const data = await Campaings.find({}).populate("brand")
      console.log(data)
      res.status(200).json({
        status: "success",
        data
        
      })
    }catch(e){
      console.log(e)
      res.status(502).json({
        status: "erro"
      })
    }
  })

  router.get("/campaigns/details/:id", async(req, res, next)=>{

    const id = req.params.id

    try{
      const data = await Campaings.findOne({_id: id}).populate("brand")
      
      res.status(200).json({
        status: "success",
        data
        
      })
    }catch(e){
      console.log(e)
      res.status(502).json({
        status: "erro"
      })
    }
  })

  module.exports = router