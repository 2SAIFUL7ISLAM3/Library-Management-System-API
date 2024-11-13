import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook ,deleteBook} from '../controllers/bookController';

const router = express.Router();

// Route to create a new book

router.post('/api/books', createBook);

// Route to retrieve all books

router.get('/api/books', getAllBooks);

// Route to retrieve a book by its ID

router.get('/api/books/:bookId', getBookById);

// Route to update a book by its ID

router.put('/api/books/:bookId', updateBook);

// Route to delete a book by its ID
router.delete('/api/books/:bookId', deleteBook);

export default router;
