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
    let data = {user: users[0]}
    res.render('profile', data);
});

app.get('/credit', (req, res)=>{
    let data = {account: accounts.credit}
    res.render('account', data);
});

app.get('/checking', (req, res)=>{
    let data = {account: accounts.checking}
    res.render('account', data);
});

app.get('/savings', (req, res)=>{
    let data = {account: accounts.savings}
    res.render('account', data);
});


app.get('/', (req, res)=>{
    let data = {title: 'Account Summary',
                accounts: accounts
                }
    //console.log(data.accounts);
    for(let account in accounts){
        console.log(account);
    }
    res.render('index', data);
});




app.listen(port, function() {
    console.log(`PS Project Running on port ${port}!`)
});