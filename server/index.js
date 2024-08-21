const express = require("express");
const cors = require('cors')
require('./config/config');
const User = require('./models/User');
const app = express();


app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res)=>{
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
});

app.listen(8000, function() {
    console.log("Server started on http://localhost:8000/");
});
