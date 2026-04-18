import express from 'express';

import { createIdea, deleteIdea, getIdeaById, getIdeas, updateIdea } from '../controllers/idea.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', protect, createIdea);
router.get('/', protect, getIdeas);
router.get('/:id', protect, getIdeaById);
router.put('/:id', protect, updateIdea);
router.delete('/:id', protect, deleteIdea);

export default router;