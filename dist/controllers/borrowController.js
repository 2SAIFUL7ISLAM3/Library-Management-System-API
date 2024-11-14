"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverdueBorrowList = exports.returnBook = exports.getAllBorrowBooks = exports.borrowBook = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Function to borrow a book
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId, memberId } = req.body;
        // Step 1: Check if the book exists and if there are available copies
        const book = yield prisma.book.findUnique({
            where: { bookId },
        });
        if (!book) {
            return next({
                status: 404,
                message: "Book not found",
            });
        }
        if (book.availableCopies <= 0) {
            return next({
                status: 400,
                message: "No available copies for borrowing",
            });
        }
        // Step 2: Create a borrow record
        const borrowRecord = yield prisma.borrowRecord.create({
            data: {
                bookId,
                memberId,
                borrowDate: new Date(),
            },
        });
        // Step 3: Update the availableCopies of the book
        yield prisma.book.update({
            where: { bookId },
            data: {
                availableCopies: book.availableCopies - 1,
            },
        });
        // Step 4: Send success response
        res.status(200).json({
            success: true,
            status: 200,
            message: "Book borrowed successfully",
            data: {
                borrowId: borrowRecord.borrowId,
                bookId: borrowRecord.bookId,
                memberId: borrowRecord.memberId,
                borrowDate: borrowRecord.borrowDate,
            },
        });
    }
    catch (error) {
        next(error);
        // console.error("Error borrowing book:", error);
        // res.status(500).json({
        //   success: false,
        //   status: 500,
        //   message: "Failed to borrow book",
        // });
    }
});
exports.borrowBook = borrowBook;
// Function to retrieve all Borrow Books
const getAllBorrowBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const BorrowBooks = yield prisma.borrowRecord.findMany();
        // Send response
        res.status(200).json({
            success: true,
            status: 200,
            message: "Borrow Books retrieved successfully",
            data: BorrowBooks,
        });
    }
    catch (error) {
        console.error("Error retrieving Borrow Books:", error);
        res.status(500).json({
            success: false,
            status: 500,
            message: "Failed to retrieve Borrow Books",
        });
    }
});
exports.getAllBorrowBooks = getAllBorrowBooks;
// Function to return a book
const returnBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { borrowId } = req.body;
        // Step 1: Find the borrow record
        const borrowRecord = yield prisma.borrowRecord.findUnique({
            where: { borrowId },
            include: {
                Book: true, // Include book details to update available copies
            },
        });
        if (!borrowRecord) {
            return next({
                status: 404,
                message: "Borrow record not found",
            });
        }
        // Step 2: Update the borrow record's returnDate
        yield prisma.borrowRecord.update({
            where: { borrowId },
            data: {
                returnDate: new Date(),
            },
        });
        // Step 3: Update the book's availableCopies
        yield prisma.book.update({
            where: { bookId: borrowRecord.bookId },
            data: {
                availableCopies: borrowRecord.Book.availableCopies + 1,
            },
        });
        // Step 4: Send success response
        res.status(200).json({
            success: true,
            status: 200,
            message: "Book returned successfully",
        });
    }
    catch (error) {
        next(error);
        // console.error("Error returning book:", error);
        // res.status(500).json({
        //   success: false,
        //   status: 500,
        //   message: "Failed to return book",
        // });
    }
});
exports.returnBook = returnBook;
const getOverdueBorrowList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the current date
        const currentDate = new Date();
        // Fetch borrow records where returnDate is null and borrowDate + 14 days is before the current date
        const overdueBooks = yield prisma.borrowRecord.findMany({
            where: {
                returnDate: null,
                borrowDate: {
                    lt: new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
                },
            },
            include: {
                Book: true, // Include book details
                Member: true, // Include member details
            },
        });
        if (overdueBooks.length > 0) {
            // Map the overdue books to the required response format
            const overdueList = overdueBooks.map((borrowRecord) => ({
                borrowId: borrowRecord.borrowId,
                bookTitle: borrowRecord.Book.title,
                borrowerName: borrowRecord.Member.name,
                overdueDays: Math.floor((currentDate.getTime() -
                    new Date(borrowRecord.borrowDate).getTime()) /
                    (1000 * 3600 * 24) -
                    14), // Calculate overdue days
            }));
            // Return the overdue books
            res.status(200).json({
                success: true,
                status: 200,
                message: "Overdue borrow list fetched",
                data: overdueList,
            });
        }
        else {
            // No overdue books
            res.status(200).json({
                success: true,
                status: 200,
                message: "No overdue books",
                data: [],
            });
        }
    }
    catch (error) {
        next(error); // Pass the error to the global error handler
    }
});
exports.getOverdueBorrowList = getOverdueBorrowList;
