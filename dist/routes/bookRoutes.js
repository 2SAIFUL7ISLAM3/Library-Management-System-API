"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const router = express_1.default.Router();
// Route to create a new book
router.post('/api/books', bookController_1.createBook);
// Route to retrieve all books
router.get('/api/books', bookController_1.getAllBooks);
// Route to retrieve a book by its ID
router.get('/api/books/:bookId', bookController_1.getBookById);
// Route to update a book by its ID
router.put('/api/books/:bookId', bookController_1.updateBook);
// Route to delete a book by its ID
router.delete('/api/books/:bookId', bookController_1.deleteBook);
exports.default = router;
