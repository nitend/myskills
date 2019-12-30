const express = require("express");
const http = require("http");
const model = require("./model")

const app = express();

app.set('view engine', 'pug');

// const docs = model.getAll();
// console.log(docs);

app.get('/', (req, res) => { 
    res.render(__dirname + '/results/view/results');
})


app.listen(8080, () => {
    console.log('Server is listening on Port 8080')
})

