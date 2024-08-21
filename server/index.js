const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/xlo');
        console.log("Connected to MongoDB");

        const credentialSchema = new mongoose.Schema({});
        const users = mongoose.model('users', credentialSchema);
        const data = await users.find();
        console.log("Fetched data:", data);

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
