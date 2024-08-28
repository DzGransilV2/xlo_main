const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uname:String,
    email:String,
    userpic:String,
    password:String
});

module.exports = mongoose.model('users', userSchema);