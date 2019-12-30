const express = require("express");
const http = require("http");
const model = require("./model")

const app = express();
const users = [];

app.use(express.urlencoded({extended: false}))
app.set('view engine', 'pug');

// const docs = model.getAll();
// console.log(docs);

app.get('/', (req, res) => { 
    res.render(__dirname + '/results/view/results');
})

app.post('/login', (req, res) => {

    users.push(
    {
        id: Date.now().toString,
        email: rereq.body.email,
        password: req.body.password
    }
    )

    console.log(req.body.email);
    console.log(req.body.password);

    res.redirect('/')
})

app.listen(8080, () => {
    console.log('Server is listening on Port 8080')
})

