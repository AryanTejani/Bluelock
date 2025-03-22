import express from 'express';
import {getLatLong, getWeatherData} from '../controller/data.controller.js'

const router = express.Router();

router.get('/weather', getWeatherData);
router.get('/latlong',getLatLong)
export default router;