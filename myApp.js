var express = require('express');
var app = express();

console.log("Hello World")

staticPath = __dirname + "/public"

app.use("/public",express.static(staticPath))


app.get('/', (req, res) => {
    // res.send("Hello Express")
    absolutePath = __dirname + "/views/index.html"
    res.sendFile(absolutePath)
})
































 module.exports = app;
