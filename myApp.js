var express = require('express');
var bodyParser = require('body-parser')
var app = express();
require('dotenv').config()
console.log("Hello World")

staticPath = __dirname + "/public"

app.use("/public",express.static(staticPath))

app.use(bodyParser.urlencoded({
    extended : false
}))
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


app.route('/name').get((req,res)=>
{
    firstName = req.query.first
    lastName = req.query.last
    res.json(
        {
            'name': `${firstName} ${lastName}`
        }
    )
}).post((req,res) => {
    firstName = req.body.first
    lastName = req.body.last
    res.json(
        {
            'name': `${firstName} ${lastName}`
        }
    )
})



























 module.exports = app;
