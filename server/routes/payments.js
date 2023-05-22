var express = require('express');
var router = express.Router();
require('dotenv').config()
const Account = require('../models/Account')
const Transactions = require('../models/Transaction')
const Contracts = require("../models/Contracts")
const secretKey = process.env.STRIPE_KEY
const User = require('../models/User');
const stripe = require('stripe')(secretKey)
/* GET home page. */
router.get("/createcustomer", async(req, res)=>{
  try{
    const customer = await stripe.customers.create({
      email: "branduser4@gmail.com",
      name: "branduser4",
      description: 'testing account',
      balance: 0
    });
    const val = {
      userId: '64180cea09878a11f84d9b98',
      role : "brand",
      accountId: customer.id,
     }
      await Account.create(val)
      res.status(200).send("success")
  }
  catch(e){
    res.status(500).send("success")
  }
})
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
    if(data){
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
  }else{
    res.status(200).json({
      status:"success",
      data: {}
    })
  }
    
    
  }catch(e){
    console.log(e)
    res.status(500).json({
      status: "error",
      
    })
  }
})


router.get("/getbrandaccountdetails/:id", async(req, res)=>{

  try{
    const id = req.params.id
    const data = await Account.findOne({userId: id})
    const cards = await stripe.customers.listPaymentMethods(
      data.accountId,
      {type: 'card'}
    );
    res.status(200).json({
      status: 'success',
      accountId: data.accountId,
      data: cards.data
    })
  }catch(e){
    console.log(e)
    res.status(500).json({
      status: "error",
      
    })
  }
})

router.get("/getsecret/:id", async (req, res) =>{
  try{
    const id = req.params.id
    const setupIntent = await stripe.setupIntents.create({
      customer: id,
      payment_method_types: ['card'],
    });
    res.status(200).json({
      status: 'success',
      data: setupIntent.client_secret
    })
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

     
    
     
      
    const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: 'http://localhost:5173/payments/manage/',
        return_url: 'http://localhost:5173/payments/manage/',
        type: 'account_onboarding',
      });
      Account.create(val)
     
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
router.post("/createcustomer/:id", async(req, res, next)=>{
  const data = req.body
  const id = req.params.id
  try{

    const customer = await stripe.customers.create({
      ...data,
      description: 'test account 2',
      balance: 0
    });
    const val = {
      userId: id,
      role : "brand",
      accountId: customer.id,
     }

    Account.create(val)
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
router.get("/getpaymentmethods/:id", async(req, res, next)=>{
  const id = req.params.id
  try{
    
    // const cards = await stripe.customer.listSources(
    //   {
    //   customer:  id,
    //   type: 'card'
    //   }
    // );
    const cards = await stripe.customers.listSources(
      id,
      {object: 'card', limit: 3}
    );
   console.log(cards)
    res.status(200).json({
      status: "success",
      paymentMethods: cards.data
    })
  }catch(e){
    console.log(e)
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

router.get("/getbrandhistory/:id", async(req, res)=>{
  try{
    const id = req.params.id
    const data = await Transactions.find({userFrom:id}).populate('userTo')
    res.status(200).json({
      status: "success",
      data
    })
  }catch(e){
    res.status(500).json({
      status: "error",
     
    })
  }
})

router.get("/getinfluencerhistory/:id", async(req, res)=>{
  try{
    const id = req.params.id
    const data = await Transactions.find({userTo:id}).populate('userFrom')
    res.status(200).json({
      status: "success",
      data
    })
  }catch(e){
    console.log(e)
    res.status(500).json({
      status: "error",
     
    })
  }
})
router.get("/getpendingPayment/:id", async(req, res)=>{
  try{
    const id = req.params.id
    const contracts = await Contracts.find({sender: id, accepted:true, expired:false}).populate("to").populate("campaignId")
    const data = contracts.map(item=>{
      return {
        amount : item.amount,
        date: item.expiresAt,
        name: item.to.name,
        campaign: item.campaignId.title,
        key: item?._id
      }
    })
    res.status(200).json({
      status: "success",
      data
    })
  }catch(e){
    res.status(500).json({
      status: "error",
     
    })
  }
})

router.get("/getcards/:id", async (req, res)=>{
  try{
    const id = req.params.id
    const accountData = await Account.findOne({userId:id})
    
const cards = await stripe.accounts.listExternalAccounts(
  accountData.accountId,
  {object: 'card', limit: 3}
);
  res.status(200).json({
    status:"success",
    data : cards.data
  })
  }catch(e){
    res.status(500).json({
      status: "error",
     
    })
  }
})

router.post("/attachpaymentmethod/:id", async( req, res)=>{
  const id = req.params.id
  const {number, exp_month,exp_year, cvc} = req.body
  const data = {
    body: {
      type: "card",
      card: {
        number,
        exp_month,
        exp_year,
        cvc,
      },
    },
  };
  console.log(data.body)
  try{

    let paymentMethod = await stripe.paymentMethods.create(data.body)
    if(id){
      
      paymentMethod = await stripe.paymentMethods.attach(paymentMethod.id,{
        customer: id
      })
      await stripe.customers.update(id,{
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      })
    }

    const accountData = await Account.findOne({accountId:id})
    await User.updateOne({_id:accountData.userId}, {paymentAttached: true})
    
    
    res.status(200).json({
      status:"success",
      data:paymentMethod
    })
  }catch(e){
    console.log(e)
    res.status(500)
  }
})
module.exports = router;
