"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrowController_1 = require("../controllers/borrowController");
const router = express_1.default.Router();
// Route to borrow a book
router.post('/api/borrow', borrowController_1.borrowBook);
// Route to borrow a book
router.get('/api/borrow', borrowController_1.getAllBorrowBooks);
// Route to return a book
router.post('/api/return', borrowController_1.returnBook);
// Create the Overdue Borrow List Route
router.get('/api/borrow/overdue', borrowController_1.getOverdueBorrowList);
exports.default = router;
