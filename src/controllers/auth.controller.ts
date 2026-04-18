import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are require'});
    }

    // check user
    const user = await User.findOne({ email});

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials'});
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials'});
    }

    // generate token
    const token = jwt.sign(
      {id: user._id},
      process.env.JWT_SECRET as string,
      { expiresIn: '1d'}
    );

    res.status(200).json({ token });
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error});
  }
}