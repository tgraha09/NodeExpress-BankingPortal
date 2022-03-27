const fs = require('fs');
const path = require('path');
const express = require('express');
const { fromPairs } = require('ramda');
const app = express()

var port = 3000



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


const accountData = fs.readFileSync('src/json/accounts.json', {encoding: 'UTF8'})
const accounts = JSON.parse(accountData)

const userData = fs.readFileSync('src/json/users.json', {encoding: 'UTF8'})
const users = JSON.parse(userData)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}));

app.get('/transfer', (req, res)=>{
    res.render('transfer');
});

app.post('/transfer', (req, res)=>{
    let {from, to, amount} = req.body
    let currentBalance = accounts[from].balance - parseInt(amount)
    let newBalance = accounts[to].balance + parseInt(amount)
    //let newBalance = accounts[to].balance //JSON.parse(accounts[to].balance)
   // console.log("Before");
    //console.log(currentBalance);
    //let newBalance = currentBalance + parseInt(amount)
   
   // newBalance += JSON.parse(amount) 
    accounts[from].balance = currentBalance
    accounts[to].balance = newBalance
    //accounts[to].balance = currentBalance
    var accountsJSON = JSON.stringify(accounts)
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, "utf8")
    //console.log(accounts["checking"].balance);
    //console.log(accounts["savings"].balance);
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
    var accountsJSON = JSON.stringify(accounts)
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, "utf8")
    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});


app.get('/profile', (req, res)=>{
    res.render('profile', {user: users[0]});
});

app.get('/credit', (req, res)=>{
    res.render('account', {account: accounts.credit});
});

app.get('/checking', (req, res)=>{
    res.render('account', {account: accounts.checking});
});

app.get('/savings', (req, res)=>{
    res.render('account', {account: accounts.savings});
});


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