var express = require('express');
var router = express.Router();
require('dotenv').config()
const Account = require('../models/Account')
const secretKey = process.env.STRIPE_KEY

const stripe = require('stripe')(secretKey)
/* GET home page. */

router.get("/loginlink", async (req, res)=>{
  try{
    const loginLink = await stripe.accounts.createLoginLink(
      'acct_1N7HhXPXYZddKYHH'
    );
    res.send(loginLink)
  }catch(e){
    res.status(500)
  }
})

router.get("/getaccountdetails/:id", async (req, res)=>{
  try{
    const id = req.params.id
    const data = await Account.findOne({userId: id})
    if(Object.keys(data) !== 0){
      const balance = await stripe.balance.retrieve({
        stripeAccount: data?.accountId,
      });
      const available = balance?.available.reduce((sum, availablebalance)=>{
          return sum+ availablebalance.amount
      }, 0)
      const pending = balance?.pending.reduce((sum, pendingbalance)=>{
        return sum, pendingbalance.amount
      },0)
      const total = pending +available
      const cards = await stripe.accounts.listExternalAccounts(
        data?.accountId,
        {object: 'card', limit: 3}
      );

      const loginlink = await stripe.accounts.createLoginLink(
        data?.accountId
      );
      res.status(200).json({
        status: 'success',
        data: {
          accountId: data?.accountId,
          available: available/100,
          pending: pending/100,
          total :total/100,
          loginLink: loginlink?.url,
          balance,
          cards

        }
    })
  }
    
    
  }catch(e){
    console.log(e)
    res.status(500).json({
      status: "error",
      
    })
  }
})

router.get("/getexternalaccounts/:id", async(req, res)=>{
  try{
    const id = req.params.id
    const data = await Account.findOne({userId: id})

    const cards = await stripe.accounts.listExternalAccounts(
      data.accountId,
      {object: 'card', limit: 3}
    );
      res.status(200).json({
        status: 'success',
        data: cards
      })

  }catch(e){
    res.status(500).json({
      status: "error",
      
    })
  }
})
// to create a connected aacount
router.post("/create", async(req, res, next)=>{
  console.log("this is the body", req.body)
  const {id, email} = req.body
  try{
     const account = await stripe.accounts.create({type: 'express', email: email});
     const val = {
      userId: id,
      role : "influencer",
      accountId: account.id,
     }

      Account.create(val)
    
     
      
    const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: 'http://localhost:5173/payments/manage/',
        return_url: 'http://localhost:5173/payments/manage/',
        type: 'account_onboarding',
      });

     
    res.status(200).json({
      status: 'success',
       url: accountLink.url
    })
  }catch(e){
    console.log(e)
    res.status(500).json({
      status: 'error'
    })
  }
})

router.get("/createnewAccountlink/:id", async(req, res)=>{
      const id = req.params.id
  try{
    const accountLink = await stripe.accountLinks.create({
      account: id,
      refresh_url: 'http://localhost:5173/payments/manage/',
      return_url: 'http://localhost:5173/payments/manage/',
      type: 'account_onboarding',
    });

    res.status(200).json({
      status: 'success',
       url: accountLink.url
    })
  }catch(e){
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
