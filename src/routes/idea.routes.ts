import express from 'express';

import { createIdea } from '../controllers/idea.controller';

const router = express.Router();

router.post('/', createIdea);

export default router;