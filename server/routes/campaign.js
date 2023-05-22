const Campaign = require("../models/Campaign");
require('dotenv').config()
const express = require("express")
const axios = require('axios');
var router = express.Router();
const secretKey = process.env.STRIPE_KEY

const stripe = require('stripe')(secretKey)

router.get("/campaigns", async (req, res, next) => {
  try {
    const data = await Campaign.find({ status: { $ne: "draft" } }).populate("brand")
    console.log(data)
    res.status(200).json({
      status: "success",
      data

    })
  } catch (e) {
    console.log(e)
    res.status(502).json({
      status: "error"
    })
  }
})

router.get("/campaigns/limit", async (req, res, next) => {
  try {
    const data = await Campaign.find({ status: { $ne: "draft" } }).limit(10).populate("brand")
    console.log(data)
    res.status(200).json({
      status: "success",
      data

    })
  } catch (e) {
    console.log(e)
    res.status(502).json({
      status: "error"
    })
  }
})

//get all camapigns with search query and pagination
router.get("/allcampaigns", async (req, res, next) => {
  try {
    const { page, limit, search, category, platforms , country} = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: {},
      collation: {
        locale: "en",
      },
    };

    const query = {};
    if (search) {
      query.$and = [
        {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
            
          ],
        },
      ];
    }
    if (category) {
      query.category = { $in: category.split(",") };
    }
    if (platforms) {
      query["platform"] = { $in: platforms.split(",") };
    }
    if(country){
      query.country = {$in:country.split(",")}
    }
    const data = await Campaign.paginate(
      {status: "live", ...query},
      options
    );
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (e) {
    console.log(e);
    res.status(502).json({
      status: "error",
    });
  }
});

router.get("/campaigns/details/:id", async (req, res, next) => {

  const id = req.params.id

  try {
    const data = await Campaign.findOne({ _id: id }).populate("brand")

    res.status(200).json({
      status: "success",
      data

    })
  } catch (e) {
    console.log(e)
    res.status(502).json({
      status: "error"
    })
  }
})

//get campaign listing by brand. return the following fields(id, title, status, date, bannerImg)
router.get("/campaigns/brand/:id", async (req, res, next) => {
  console.log(req.params.id)
  try {
    const data = await Campaign.find({ brand: req.params.id }).select("title status updatedAt bannerImg")
    res.status(200).json({
      status: "success",
      data
    })
  } catch (e) {
    console.log(e)
    res.status(502).json({
      status: "error"
    })
  }
})

// create Campaign
router.post("/create", async (req, res, next) => {
  try {
    const data = await Campaign.create(req.body)
    let tags = await getKeywords(req.body.description, data._id)
    // console.log("Tags Here:"+tags)
    res.status(200).json({
      status: "success",
      data
    })

    // set tags in campaign model

  } catch (e) {
    console.log(e)
    res.status(502).json({
      status: "error"
    })
  }
})

//View campaign details by its id
router.get("/view/:id", async (req, res, next) => {
  try {
    const data = await Campaign.findOne({ _id: req.params.id })
    res.status(200).json({
      status: "success",
      data
    })
  } catch (e) {
    console.log(e)
    res.status(502).json({
      status: "error"
    })
  }
})

// update Campaign details that have changed in body of request
router.patch("/update/:id", async (req, res, next) => {
  try {
    const data = await Campaign.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.status(200).json({
      status: "success",
      data
    })
  } catch (e) {
    console.log(e)
    res.status(502).json({
      status: "error"
    })
  }
})

// update Campaign details that have changed in body of request and set status to live
router.patch("/publish/:id", async (req, res, next) => {
  try {
    const data = await Campaign.findOneAndUpdate({ _id: req.params.id }, { ...req.body, status: "live" }, { new: true })
    res.status(200).json({
      status: "success",
      data
    })
  } catch (e) {
    console.log(e)
    res.status(502).json({
      status: "error"
    })
  }
})


// delete Campaign
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const data = await Campaign.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({
      status: "success",
      data
    })
  } catch (e) {
    console.log(e)
    res.status(502).json({
      status: "error"
    })
  }
})

const getKeywords = async (description, id) => {

  const url = "http://127.0.0.1:6000/keywords";
  // make axios post call on url

  axios.post(url, {
    description: description
  })
    .then(async function (response) {
      // handle success
      console.log(response.data);
      //patch the campaign with the keywords in tags
      const data = await Campaign.findOneAndUpdate({ _id: id }, { tags: response.data }, { new: true })

      return (response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return (error);
    })
}

module.exports = router