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

export const getIdeas = async (req: Request, res: Response) => {
  try {
    const ideas = await Idea.find();

    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Server error", error});
  }
}

export const getIdeaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findById(id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found'});
    }

    res.status(200).json(idea);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error});
  }
}


export const updateIdea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const idea = await Idea.findById(id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found'});
    }

    idea.title = title || idea.title;
    idea.description = description || idea.description;

    const updatedIdea = await idea.save();

    res.status(200).json(updatedIdea);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error});
  }
}

export const deleteIdea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedIdea = await Idea.findByIdAndDelete(id);

    if (!deletedIdea) return res.status(404).json({ message: 'Idea not found'});

    res.status(200).json({ message: 'Idea deleted successfully'});

  } catch (error) {
    res.status(500).json({ message: 'Server error', error});
  }
}