import express from 'express';
import { borrowBook,returnBook,getOverdueBorrowList, getAllBorrowBooks } from '../controllers/borrowController';

const router = express.Router();

// Route to borrow a book

router.post('/api/borrow', borrowBook);

// Route to borrow a book

router.get('/api/borrow', getAllBorrowBooks);

// Route to return a book

router.post('/api/return', returnBook);

// Create the Overdue Borrow List Route

router.get('/api/borrow/overdue', getOverdueBorrowList);

export default router;
