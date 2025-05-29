const Book = require('../models/book');
const mongoose = require("mongoose");

// GET a single book by ID
const getBook = async (req, res) => {
  const bookId = req.params.id;

  Book.findById(bookId, (err, book) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      book
    });
  });
};

// GET all books with author and genre details
const getAllBooks = async (req, res) => {
  Book.aggregate([
    {
      $lookup: {
        from: "authors",
        localField: "authorId",
        foreignField: "_id",
        as: "author"
      }
    },
    {
      $unwind: "$author"
    },
    {
      $lookup: {
        from: "genres",
        localField: "genreId",
        foreignField: "_id",
        as: "genre"
      }
    },
    {
      $unwind: "$genre"
    }
  ]).exec((err, books) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      booksList: books
    });
  });
};

// ADD a new book
const addBook = async (req, res) => {
  const { genreId, authorId } = req.body;

  // Validate genreId and authorId
  if (!mongoose.Types.ObjectId.isValid(genreId)) {
    return res.status(400).json({ success: false, message: "Invalid genreId" });
  }

  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ success: false, message: "Invalid authorId" });
  }

  const newBook = {
    ...req.body,
    genreId: mongoose.Types.ObjectId(genreId),
    authorId: mongoose.Types.ObjectId(authorId)
  };

  console.log("New Book:", newBook);

  Book.create(newBook, (err, book) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      newBook: book
    });
  });
};

// UPDATE a book
const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  Book.findByIdAndUpdate(bookId, updatedBook, { new: true }, (err, book) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      updatedBook: book
    });
  });
};

// DELETE a book
const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  Book.findByIdAndDelete(bookId, (err, book) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      deletedBook: book
    });
  });
};

module.exports = {
  getBook,
  getAllBooks,
  addBook,
  updateBook,
  deleteBook
};
