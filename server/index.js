const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/xlo').then(
            console.log("Connected to MongoDB")
        );
        const userSchema = new mongoose.Schema({
            uname: String
        });
        const users = mongoose.model('users', userSchema);
        const data = await users.find().then(
            console.log("DATA FOUND")
        );
        console.log(data)
    } catch (error) {
        console.error("Error occurred:", error);
    }
};

connectDB();

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>App in Progress</title>
        </head>
        <body>
            <h1>App in progress</h1>
        </body>
        </html>
    `);
});

app.listen(8000, function() {
    console.log("Server started on http://localhost:8000/");
});
