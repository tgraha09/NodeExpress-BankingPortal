const fs = require('fs');
const path = require('path');
const express = require('express');
const { fromPairs } = require('ramda');
const { accounts, users, writeJSON } = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');
const { use } = require('chai');
const app = express()



var port = 3000



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}));

/*app.get('/transfer', (req, res)=>{
    res.render('transfer');
});

app.post('/transfer', (req, res)=>{
    let {from, to, amount} = req.body
    let currentBalance = accounts[from].balance - parseInt(amount)
    let newBalance = accounts[to].balance + parseInt(amount)

    accounts[from].balance = currentBalance
    accounts[to].balance = newBalance

    writeJSON()

    res.render('transfer', {message: "Transfer Completed"})
}); 

app.get('/payment', (req, res)=>{
    
    res.render('payment', {account: accounts.credit});
});

app.post('/payment', (req, res)=>{
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
});*/


app.get('/profile', (req, res)=>{
    res.render('profile', {user: users[0]});
});

app.use('/account', accountRoutes)
app.use('/services', servicesRoutes)
/*app.get('/credit', (req, res)=>{
    res.render('account', {account: accounts.credit});
});

app.get('/checking', (req, res)=>{
    res.render('account', {account: accounts.checking});
});

app.get('/savings', (req, res)=>{
    res.render('account', {account: accounts.savings});
});*/


app.get('/', (req, res)=>{
    var data = {title: 'Account Summary',
                accounts: accounts
                }
   // console.log(data.accounts);
    Object.keys(accounts).forEach(function(account) { 
        //console.log(accounts[account]);
    })
    
    res.render('index', {title: 'Account Summary',
    accounts: accounts
    });
});




app.listen(port, function() {
    console.log(`PS Project Running on port ${port}!`)
});