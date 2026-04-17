import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from '../models/user.model';


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required'});
    }

    // check if user exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists'});
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully'});
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error});
  }
}