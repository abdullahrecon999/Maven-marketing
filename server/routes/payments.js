var express = require('express');
var router = express.Router();
require('dotenv').config()
const Account = require('../models/Account')
const secretKey = process.env.STRIPE_KEY

const stripe = require('stripe')(secretKey)
/* GET home page. */


// to create a connected aacount
router.post("/create", async(req, res, next)=>{

  try{
    //  const account = await stripe.accounts.create({type: 'express', email: req.body.email});
    //  const val = {
    //   userId: req.body.id,
    //   role : "influencer",
    //   accountId: account.id,
    //  }

    //  Account.create(val)
    
    //  const data = await Account.create()
      
    //   const accountLink = await stripe.accountLinks.create({
    //     account: account.id,
    //     refresh_url: 'https://example.com/reauth',
    //     return_url: 'https://example.com/return',
    //     type: 'account_onboarding',
    //   });

     
    res.status(200).json({
      status: 'success',
      // account
    })
  }catch(e){
    console.log(e)
    res.status(500).json({
      status: 'error'
    })
  }
})


// create brand account to pay
router.get("/createcustomer", async(req, res, next)=>{
  const data = req.body
  try{

    const customer = await stripe.customers.create({
      ...data,
      description: 'test account 2',
      balance: 10000
    });
    res.status(200).json({
      status: "success",
      customer
    })
  }catch(e){
    res.status(500)
  }
})

router.get("/addfunds", async (req, res, next)=>{
  try{
    const customer = await stripe.testHelpers.customers.fundCashBalance(
      'cus_Nt16cydUXuCS7N',
      {amount: 5000, currency: 'usd'})
  }catch(e){

  }
})


router.get("/setupintent", async(req, res, next)=>{
  const id = req.params.id
  try{

    const setupIntent = await stripe.setupIntents.create({
      customer: "cus_Nt16cydUXuCS7N",
      payment_method_types: ['card'],
    });
    res.status(200).json({
      status: "success",
      setupIntent
    })
  }catch(e){
    res.status(500)
  }
})
router.get("/getpaymentmethods", async(req, res, next)=>{
  const id = req.params.id
  try{
    
    const paymentMethods = await stripe.paymentMethods.list({
      customer: "cus_Nt16cydUXuCS7N",
      type: 'card',


    });
    res.status(200).json({
      status: "success",
      paymentMethods
    })
  }catch(e){
    res.status(500)
  }
})


router.get("/requestpayment", async(req,res, next)=>{

})
router.get("/usecard", async (req, res, next)=>{
  const data = req.body
  try{
    const paymentMethods = await stripe.paymentMethods.list({
      customer: data.brandAccountId,
      type: 'card',
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.amount,
      currency: 'usd',
     
      payment_method: paymentMethods?.data[0]?.id,
      off_session : true,
      confirm :true,
      customer : data.brandAccountId,
      transfer_data: {
        destination: data.connectedAccountId,
      },

    });
    res.status(200).json({
      status: "success",
      paymentIntent
    })
}catch(e){
  console.log(e)
  res.status(500)
}})


router.get('/getconnectedaccountbalance/:id', async (req, res, next)=>{
  const id = req.params.id
  try{
    const balance = await stripe.balance.retrieve({
      stripeAccount: id,
    });
    res.status(200).json({
      status: "success",
      balance
    })
  }catch(e){
    res.status(500).json({
        status:"error"
    })
  }
})
module.exports = router;
