const Borrowal = require('../models/borrowal');
const mongoose = require("mongoose");
const Book = require("../models/book");

const getBorrowal = async (req, res) => {
    const borrowalId = req.params.id;

    try {
        const borrowal = await Borrowal.findById(borrowalId);
        res.status(200).json({ success: true, borrowal });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

const getAllBorrowals = async (req, res) => {
    try {
        const borrowals = await Borrowal.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "memberId",
                    foreignField: "_id",
                    as: "member"
                },
            },
            { $unwind: "$member" },
            {
                $lookup: {
                    from: "books",
                    localField: "bookId",
                    foreignField: "_id",
                    as: "book"
                },
            },
            { $unwind: "$book" }
        ]);

        res.status(200).json({
            success: true,
            borrowalsList: borrowals
        });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

const addBorrowal = async (req, res) => {
    const { memberId, bookId, borrowedDate, dueDate, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(memberId)) {
        return res.status(400).json({ success: false, message: "Invalid memberId" });
    }

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ success: false, message: "Invalid bookId" });
    }

    const newBorrowal = {
        memberId: mongoose.Types.ObjectId(memberId),
        bookId: mongoose.Types.ObjectId(bookId),
        borrowedDate,
        dueDate,
        status
    };

    try {
        const borrowal = await Borrowal.create(newBorrowal);
        await Book.findByIdAndUpdate(bookId, { isAvailable: false });

        res.status(200).json({
            success: true,
            newBorrowal: borrowal
        });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

const updateBorrowal = async (req, res) => {
    const borrowalId = req.params.id;
    const updatedBorrowal = req.body;

    try {
        const borrowal = await Borrowal.findByIdAndUpdate(borrowalId, updatedBorrowal, { new: true });
        res.status(200).json({
            success: true,
            updatedBorrowal: borrowal
        });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

const deleteBorrowal = async (req, res) => {
    const borrowalId = req.params.id;

    try {
        const borrowal = await Borrowal.findByIdAndDelete(borrowalId);

        if (!borrowal) {
            return res.status(404).json({ success: false, message: "Borrowal not found" });
        }

        await Book.findByIdAndUpdate(borrowal.bookId, { isAvailable: true });

        res.status(200).json({
            success: true,
            deletedBorrowal: borrowal
        });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

module.exports = {
    getBorrowal,
    getAllBorrowals,
    addBorrowal,
    updateBorrowal,
    deleteBorrowal
};
