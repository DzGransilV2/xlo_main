const express = require("express");
const cors = require('cors')
require('./config/config');
const User = require('./models/User');
const app = express();


app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    if (req.body.uname && req.body.email && req.body.password) {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject()
        delete result.password;
        res.send(result);
    }else{
        res.send({ result: 'Please fill all fields' });
    }
});

app.post('/login', async (req, res) => {
    if (req.body.uname && req.body.password) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            res.send(user);
        } else {
            res.send({ result: 'No user found' });
        }
    } else {
        res.send({ result: 'Please enter both username and password' });
    }
})

app.listen(8000, function () {
    console.log("Server started on http://localhost:8000/");
});
