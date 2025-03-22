import express from 'express';
import getWeatherData from '../controller/data.controller.js';

const router = express.Router();
router.get('/weather', getWeatherData);
export default router;