import express from 'express';
import bookRoutes from './routes/bookRoutes';
import memberRoutes from './routes/memberRoutes';
import { errorHandler } from './controllers/middleware/errorHandler';
import borrowRoutes from './routes/borrowRoutes';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Book routes
app.use(bookRoutes);

// Use member routes
app.use(memberRoutes);

// Use the borrow routes
app.use(borrowRoutes);


// Add the global error handler as the last middleware
app.use(errorHandler);


export default app;
