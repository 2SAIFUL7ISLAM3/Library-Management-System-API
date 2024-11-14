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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Controller function to create a new book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, genre, publishedYear, totalCopies, availableCopies } = req.body;
        // Create a new book record in the database
        const newBook = yield prisma.book.create({
            data: {
                title,
                genre,
                publishedYear,
                totalCopies,
                availableCopies,
            },
        });
        // Send response
        res.status(201).json({
            success: true,
            status: 201,
            message: "Book created successfully",
            data: newBook,
        });
    }
    catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({
            success: false,
            status: 500,
            message: "Failed to create book",
        });
    }
});
exports.createBook = createBook;
// Function to retrieve all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield prisma.book.findMany();
        // Send response
        res.status(200).json({
            success: true,
            status: 200,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        console.error("Error retrieving books:", error);
        res.status(500).json({
            success: false,
            status: 500,
            message: "Failed to retrieve books",
        });
    }
});
exports.getAllBooks = getAllBooks;
// Function to retrieve a book by its ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        // Find book by ID
        const book = yield prisma.book.findUnique({
            where: { bookId },
        });
        // Check if the book exists
        if (!book) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Book not found",
            });
        }
        // Send response
        res.status(200).json({
            success: true,
            status: 200,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        console.error("Error retrieving book:", error);
        res.status(500).json({
            success: false,
            status: 500,
            message: "Failed to retrieve book",
        });
    }
});
exports.getBookById = getBookById;
// Function to update a book by its ID
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { title, genre, publishedYear, totalCopies, availableCopies } = req.body;
        // Update book by ID
        const updatedBook = yield prisma.book.update({
            where: { bookId },
            data: {
                title,
                genre,
                publishedYear,
                totalCopies,
                availableCopies,
            },
        });
        // Send response
        res.status(200).json({
            success: true,
            status: 200,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        console.error("Error updating book:", error);
        if (error.code === "P2025") {
            // Prisma error code P2025 indicates that no record was found
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Book not found",
            });
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Failed to update book",
        });
    }
});
exports.updateBook = updateBook;
// Function to delete a book by its ID
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        // Delete book by ID
        yield prisma.book.delete({
            where: { bookId },
        });
        // Send response
        res.status(200).json({
            success: true,
            status: 200,
            message: "Book successfully deleted",
        });
    }
    catch (error) {
        console.error("Error deleting book:", error);
        if (error.code === "P2025") {
            // Prisma error code P2025 indicates that no record was found
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Book not found",
            });
        }
        res.status(500).json({
            success: false,
            status: 500,
            message: "Failed to delete book",
        });
    }
});
exports.deleteBook = deleteBook;
