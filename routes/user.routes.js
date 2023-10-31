const express = require('express');
const userRouter = express.Router();
const {userRegister, userLogin, protect} = require('../controller/user-auth.controller');
const {
        addNewBook, 
        updateBook, 
        deleteBook,
        getAllBooks,
        getABook
    } = require('../controller/book.controller');
userRouter
    .post('/register', userRegister)
    .post('/login', userLogin)
    .post('/add-book', protect, addNewBook)
    .put('/:bid/update-book', protect, updateBook)
    .delete('/:bid/delete-book', protect, deleteBook)
    .get('/all-books', protect, getAllBooks)
    .get('/:bid/book', protect, getABook)

module.exports =  userRouter