import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// POST /api/users - Create user
router.post('/', async (req, res) => {
  try {
    const { name, email, password, image, resume } = req.body;
    
    // Validate required fields
    if (!name || !email || !password || !image) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, password, and image are required' 
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email already registered' 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image,
      resume
    });
    
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/users - Get all users (without passwords)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ 
      success: true, 
      count: users.length, 
      data: users 
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;