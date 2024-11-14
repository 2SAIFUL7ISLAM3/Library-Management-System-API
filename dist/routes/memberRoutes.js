"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memberController_1 = require("../controllers/memberController");
const router = express_1.default.Router();
// Route to add a new member
router.post('/api/members', memberController_1.createMember);
// Route to retrieve all members
router.get('/api/members', memberController_1.getAllMembers);
// Route to retrieve a member by their ID
router.get('/api/members/:memberId', memberController_1.getMemberById);
// Route to update a member by their ID
router.put('/api/members/:memberId', memberController_1.updateMember);
// Route to delete a member by their ID
router.delete('/api/members/:memberId', memberController_1.deleteMember);
exports.default = router;
