var express = require('express');
var app = express();
require('dotenv').config()
console.log("Hello World")

staticPath = __dirname + "/public"

app.use("/public",express.static(staticPath))

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString()
    next()
},
(req, res) => {
    res.json(
        {"time": req.time}
    )
})

app.get('/', (req, res) => {
    // res.send("Hello Express")
    absolutePath = __dirname + "/views/index.html"
    res.sendFile(absolutePath)
})

app.get('/json', (req, res) => {
    obj = {"message" : "Hello json"}
    if (process.env['MESSAGE_STYLE'] == "uppercase")
        obj = {"message": "HELLO JSON"}
    else if (process.env['MESSAGE_STYLE'] == "lowercase")
        obj = {"message": "Hello json"}
    res.json(obj)
})

app.get('/:word/echo', (req,res) => {
    res.json(
        {'echo': req.params.word}
    )
})





























 module.exports = app;
