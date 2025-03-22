import express from 'express';
import { 
  getVillageData, 
  getWeatherData, 
  addVillage 
} from '../controller/data.controller.js';

const router = express.Router();

// Route to add a village manually
router.post('/add-village', addVillage);

// Route to fetch village data from Bhuvan API
router.get('/get-village', getVillageData);

// Route to fetch weather data
router.get('/weather', getWeatherData);

export default router;