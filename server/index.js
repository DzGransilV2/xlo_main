const express = require("express");
const cors = require('cors')
require('./config/config');
const User = require('./models/User');
const Post = require('./models/Post')
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
    } else {
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

app.post('/post', async (req, res) => {
    try {
        const post = new Post(req.body);  // Create a new instance of the model with req.body
        const savedPost = await post.save();  // Save the instance to the database
        console.warn(savedPost);
        res.send(savedPost);
    } catch (error) {
        console.error("Error saving document:", error);
        res.status(500).send("Error saving document");
    }
});


app.listen(8000, function () {
    console.log("Server started on http://localhost:8000/");
});
