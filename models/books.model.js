const mongoose = require('mongoose');

const bookModel = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    summary : {
        type : String,
        required : true
    }

},{timestamps:true});

module.exports = bookModel;