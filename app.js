const express = require("express");
const path = require('path');
const app = express();
const port = process.env.port || 3001;
const developer = require('./developer');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV === "production") {
    app.get('/*', (req, res, next) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
        next()
    })
}

let allowAccessOrigin = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Acces-Contorl-Allow-Methods', 'Content-Type', 'Authorization')
    next();
}
app.use(allowAccessOrigin)

app.use('/api/developers', developer);

app.get("/", (req, res) => {
    res.send("Developer profile")
})
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})