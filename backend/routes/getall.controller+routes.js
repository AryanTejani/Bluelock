import express from 'express';
import userModel from '../models/user.model.js';

const router = express.Router();

// Route to get all users - protected and restricted to admin/agent
router.get('/getall',  async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

export default router