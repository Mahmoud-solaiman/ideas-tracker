import { Request, Response } from 'express';
import Idea  from '../models/idea.model';

export const createIdea = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    // basic validation
    if (!title || !description) {
      return res.status(400).json({ message: 'All fields are required'});
    }

    const idea = new Idea({
      title,
      description,
      user: '650c8127393e4a2d8c3f1a2b' // Fix later with authentication
    });

    const savedIdea = await idea.save();

    res.status(201).json(savedIdea);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error});
  }
}