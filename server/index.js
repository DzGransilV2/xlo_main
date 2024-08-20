const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("app in progress");
});


app.listen(8000, function(){
    console.log("Server started on port http://localhost:8000/");
})