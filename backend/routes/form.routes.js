import express from 'express';
import { addVillage } from '../controller/form.controller.js';

const router = express.Router();

// POST route to add a village
router.post('/add-villageold', addVillage);

export default router;
