const express = require("express");
const http = require("http");
const path = require('path')
const login = require('./authentication/login.js')
const bodyParser = require('body-parser')

const app = express();


app.set('view engine', 'pug');

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
    req.logOut
    res.redirect('/');
})

app.get('/register', (req, res) => { 
    res.render(__dirname + '/views/startpage', {authmode: 'register'});
})

app.get('/interview', (req, res) => { 
    res.render(__dirname + '/views/interviewpage', {username: req.user.username});
})

app.listen(8080, () => {
    console.log('Server is listening on Port 8080')
})

