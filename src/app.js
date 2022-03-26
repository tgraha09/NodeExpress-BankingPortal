const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express()

var port = 3000



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=>{
 
    
    var data = {name:'Akashdeep'}
     
    res.render('index', {title: 'Index'});
});


app.listen(port, function() {
    console.log(`PS Project Running on port ${port}!`)
});