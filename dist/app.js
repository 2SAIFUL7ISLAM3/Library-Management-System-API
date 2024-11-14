"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const memberRoutes_1 = __importDefault(require("./routes/memberRoutes"));
const errorHandler_1 = require("./controllers/middleware/errorHandler");
const borrowRoutes_1 = __importDefault(require("./routes/borrowRoutes"));
const app = (0, express_1.default)();
// Middleware to parse JSON
app.use(express_1.default.json());
// Book routes
app.use(bookRoutes_1.default);
// Use member routes
app.use(memberRoutes_1.default);
// Use the borrow routes
app.use(borrowRoutes_1.default);
// Add the global error handler as the last middleware
app.use(errorHandler_1.errorHandler);
exports.default = app;
