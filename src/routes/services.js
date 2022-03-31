const express = require('express');
const { accounts, writeJSON } = require('../data');
const router = express.Router();

router.get('/transfer', (req, res)=>{
    res.render('transfer');
});

router.post('/transfer', (req, res)=>{
    let {from, to, amount} = req.body
    let currentBalance = accounts[from].balance - parseInt(amount)
    let newBalance = accounts[to].balance + parseInt(amount)

    accounts[from].balance = currentBalance
    accounts[to].balance = newBalance

    writeJSON()

    res.render('transfer', {message: "Transfer Completed"})
}); 

router.get('/payment', (req, res)=>{
    
    res.render('payment', {account: accounts.credit});
});

router.post('/payment', (req, res)=>{
    let {amount} = req.body
    // console.log("Before");
    let { available } = accounts.credit;
    let { balance } = accounts.credit;
    let newBalance = parseInt(accounts.credit.balance - amount);
    let newAvailable = parseInt(accounts.credit.available + amount);
    
    
    accounts.credit.balance = newBalance
    accounts.credit.available = newAvailable
   // console.log("After");
  //  console.log(credit);
   // console.log(available);
    writeJSON()
    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports = router
