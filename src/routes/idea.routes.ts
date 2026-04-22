import express from 'express';
import { body } from 'express-validator';

import { createIdea, deleteIdea, getIdeaById, getIdeas, updateIdea } from '../controllers/idea.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', protect, 
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required')
  ], createIdea);
router.get('/', protect, getIdeas);
router.get('/:id', protect, getIdeaById);
router.put('/:id', protect, updateIdea);
router.delete('/:id', protect, deleteIdea);

export default router;