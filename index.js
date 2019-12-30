const express = require("express");
const http = require("http");
const model = require("./model")

const app = express()
const users = []


app.set('view engine', 'pug')
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => { 
    res.render(__dirname + '/results/view/results');
})

app.post('/login', (req, res) => {

    console.log(req.body.email);
    console.log(req.body.password);

    res.redirect('/')
})

app.listen(8080, () => {
    console.log('Server is listening on Port 8080')
})

