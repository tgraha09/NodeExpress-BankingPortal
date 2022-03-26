const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express()

var port = 3000



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

const accountData = fs.readFileSync('src/json/accounts.json', {encoding: 'UTF8'})
const accounts = JSON.parse(accountData)

const userData = fs.readFileSync('src/json/users.json', {encoding: 'UTF8'})
const users = JSON.parse(userData)

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