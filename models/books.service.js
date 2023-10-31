const User = require('../models/user.model');

const addBookService = async (title, author, summary, userId) => {
    try {
        const user = await User.findById(userId.id);
        if(!user) {
            throw new Error("User not Found!");
        }
        const newBook = {
            title : title,
            author : author,
            summary : summary
        };
        console.log(newBook, "newBook");
        user.books.push(newBook);
        
        await user.save();
        return newBook;
    } catch (error) {
        throw new Error("Can't add book");
    }
};

const updateBookService = async (bookId, updatedBookData, userId) => {
    try {
        const user = await User.findById(userId.id);
        if (!user) {
          throw new Error("User not found");
        }

        const bookIndex = user.books.findIndex((book) => {
            let userBookIndex = book._id.toString();
            return userBookIndex == bookId
        });
        if (bookIndex === -1) {
            throw new Error("Book Not Found");
        }

        user.books[bookIndex].title = updatedBookData.title;
        user.books[bookIndex].author = updatedBookData.author;
        user.books[bookIndex].summary = updatedBookData.summary;

        await user.save();
        return user.books[bookIndex];
    } catch (error) {
        throw new Error("Can't update the book");
    }
};

const deleteBookService = async (userId, bookId) => {
    try {
        const user = await User.findById(userId.id);

        if(!user) {
            throw new Error("User not found");
        }

        const bookIndex = user.books.findIndex((book) => {
            let userBookIndex = book._id.toString();
            return userBookIndex == bookId
        });

        if (bookIndex === -1) {
            throw new Error("Book Not Found");
        }

        user.books.splice(bookIndex, 1);
        await user.save();

        return true;
    } catch (error) {
        throw new Error("Can't delete the book");
    }
};

const getAllBooksService = async (userId) => {
    try {
        const user = await User.findById(userId.id);
        if(!user) {
            throw new Error("No user has been found");
        }
        
        return user.books;
    } catch (error) {
        throw new Error("Can't get all the book");
    }
};

const getABookService = async (userId, bookId) => {
    try {
        const user = await User.findById(userId.id);

        if(!user) {
            throw new Error("User Not Found!");
        }

        const bookIndex = user.books.findIndex( (book) => {
            let myBooks = book._id.toString();
            return myBooks === bookId;
        });

        if(bookIndex === -1) {
            throw new Error("This Book can't be found!");
        }

        const particularBook = user.books[bookIndex];
        return particularBook;
    } catch (error) {
        throw new Error("can't get this book");
    }
}
module.exports = {
    addBookService,
    updateBookService,
    deleteBookService,
    getAllBooksService,
    getABookService
}