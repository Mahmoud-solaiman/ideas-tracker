import express from 'express';

import { createIdea, deleteIdea, getIdeaById, getIdeas, updateIdea } from '../controllers/idea.controller';

const router = express.Router();

router.post('/', createIdea);
router.get('/', getIdeas);
router.get('/:id', getIdeaById);
router.put('/:id', updateIdea);
router.delete('/:id', deleteIdea);

export default router;