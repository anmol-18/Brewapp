const mongoose = require("mongoose");
const bookModel = require('./books.model');
const userModel = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    books : {
        type : [bookModel],
        required: true
    }
}, {timestamps:true});

module.exports = mongoose.model("User", userModel);