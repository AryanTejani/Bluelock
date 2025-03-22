import express from 'express';
import {
  registerUser,
  loginUser,
  getFarmers,
  getFarmerById,
  getAgents, // Changed from getBanks to getAgents
  getAgentById, // Changed from getBankById to getAgentById
  checkLoanEligibility
} from '../controllers/auth.controller.js';

const router = express.Router();

// Authentication Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Farmer Routes
router.get('/farmers', getFarmers);
router.get('/farmers/:id', getFarmerById);

// Agent Routes
router.get('/agents', getAgents); // Changed from banks to agents
router.get('/agents/:id', getAgentById); // Changed from banks to agents
router.post('/agents/loan-eligibility', checkLoanEligibility); // Changed from banks to agents

export default router;
