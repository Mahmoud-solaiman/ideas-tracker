import express from 'express';

import { createIdea, getIdeaById, getIdeas } from '../controllers/idea.controller';

const router = express.Router();

router.post('/', createIdea);
router.get('/', getIdeas);
router.get('/:id', getIdeaById);

export default router;