const express = require("express");
const app = express();
const port = process.env.port || 3000

app.get('/', (req,res)=>{
    res.send("Developer profile");
})

app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`)
})