var express = require('express');
const { route } = require('../app');
var router = express.Router();
const campaignModel = require("../models/campaignSchema")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/camp", function(req, res, next){
  campaignModel.create(req.body)
  res.json({
    statusCode: 200,
    
  })
})

router.get("/all", function(req, res, next){
  res.json({status: 500})
  // const camp = campaignModel.find()
  // if(!camp)
  //   res.json({status: 500})
  
  // res.json({statusCode: 200, camp})
})
module.exports = router;
