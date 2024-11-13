import express from 'express';
import {  createMember, getAllMembers, getMemberById, updateMember , deleteMember} from '../controllers/memberController';

const router = express.Router();

// Route to add a new member
router.post('/api/members', createMember);

// Route to retrieve all members
router.get('/api/members', getAllMembers);

// Route to retrieve a member by their ID
router.get('/api/members/:memberId', getMemberById);

// Route to update a member by their ID
router.put('/api/members/:memberId', updateMember);

// Route to delete a member by their ID
router.delete('/api/members/:memberId', deleteMember);

export default router;
