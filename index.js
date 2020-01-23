const express = require("express");
const http = require("http");
const path = require('path')
var flash = require('express-flash')
const login = require('./authentication/controller/login.js')
const bodyParser = require('body-parser')
const interviewer = require('./interview/controller/dialogflow')

const app = express(); 

app.set('view engine', 'pug'); 
app.use(flash())

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
login(app)

app.get('/', (req, res) => { 
    res.render(__dirname + '/views/startpage', {authmode: 'login'});
})

app.get('/login', (req, res) => { 
    res.render(__dirname + '/views/startpage', {authmode: 'login'});
})

app.get('/logout', (req, res) => {
    console.log('logged out')
    req.logOut
    res.redirect('/');
})

app.get('/register', (req, res) => { 
    res.render(__dirname + '/views/startpage', {authmode: 'register'});
})

app.get('/interview', (req, res) => { 
    res.render(__dirname + '/views/interviewpage', {username: req.user.username});
})

app.post('/answer', (req, res) =>{
    const inputtext = req.body.answer
    interviewer.runSample(inputtext, req.sessionID, null)
    res.redirect('/interview')
})

app.listen(8080, () => {
    console.log('Server is listening on Port 8080')
})

