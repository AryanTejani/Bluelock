import express from 'express';
import {
  registerUser,
  loginUser,
  getFarmers,
  getFarmerById,
  getBanks,
  getBankById,
  checkLoanEligibility
} from '../controllers/auth.controller.js';

const router = express.Router();

// Authentication Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Farmer Routes
router.get('/farmers', getFarmers);
router.get('/farmers/:id', getFarmerById);

// Banker Routes
router.get('/banks', getBanks);
router.get('/banks/:id', getBankById);
router.post('/banks/loan-eligibility', checkLoanEligibility);

export default router;
