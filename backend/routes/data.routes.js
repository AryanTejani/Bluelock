import express from 'express';
import { getLatLong, getWeatherData } from '../controllers/data.controller.js';

const router = express.Router();

router.get('/weather', getWeatherData);
router.get('/latlong', getLatLong);

export default router;