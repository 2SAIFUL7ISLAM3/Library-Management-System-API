"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging (optional)
    const status = err.status || 500; // Default to 500 (internal server error) if no status is set
    const message = err.message || 'An unexpected error occurred'; // Default message for generic errors
    res.status(status).json({
        success: false,
        status,
        message,
    });
};
exports.errorHandler = errorHandler;
