const bookService = require('../models/books.service');

const addNewBook = async (req, res, next) => {
    try {
        const {title, author, summary} = req.body;
        const userId = req.userId;
        const newBook = await bookService.addBookService(title, author, summary, userId);
        if(!newBook) {
            res.status(401).send({
                status: false,
                msg:"Error in adding new Book"
            })
        }
        res.status(200).send({
            bookDetails : newBook
        });
    } catch (error) {
        return res.status(401).json({
            status:false,
            msg:error.message
        });
    }
}

const updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.bid;
        const updatedBookData = req.body;
        const userId = req.userId
        const bookData = await bookService.updateBookService(bookId, updatedBookData, userId);

        if(!bookData) {
            res.status(401).send({
                status: false,
                msg:"Can't update the book"
            })
        }
        res.status(200).json({
            status:true,
            data:updatedBookData
        })
    } catch (error) {
        res.status(401).json({
            status:false,
            msg:error.message
        });
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const userId = req.userId;
        const bookId = req.params.bid;
        const deleteStatus = await bookService.deleteBookService(userId, bookId);
        if(!deleteStatus) {
            res.status(401).send({
                status:false,
                msg:"Can't delete the book"
            })
        }

        res.status(200).send({
            status:true,
            msg:"Book Deleted SuccessFully"
        })
    } catch (error) {
        res.status(401).json({
            status:false,
            msg:error.message
        });
    }
}

const getAllBooks = async (req, res, next) => {
    try {
        const userId = req.userId;
        const userBooks = await bookService.getAllBooksService(userId);
        res.status(200).send({
            status:true,
            data:userBooks
        })
    } catch (error) {
        res.status(401).json({
            status:false,
            msg:error.message
        });
    }
}

const getABook = async (req, res, next) => {
    try {
        const bookId = req.params.bid;
        const userId = req.userId;
        const particularBook = await bookService.getABookService(userId, bookId);
        res.status(200).send({
            status : true,
            data : particularBook
        })
    } catch (error) {
        res.status(401).json({
            status:false,
            msg:error.message
        });
    }
}

module.exports  = {
    addNewBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getABook
}