import express from 'express';
<<<<<<< HEAD
import { getLatLong, getWeatherData } from '../controllers/data.controller.js';
=======
import { 
  getVillageData, 
  getWeatherData, 
  addVillage 
} from '../controller/data.controller.js';
>>>>>>> 43e5dc84bbb2a1c1e6a961b4e219aa14d5207405

const router = express.Router();

// Route to add a village manually
router.post('/add-village', addVillage);

// Route to fetch village data from Bhuvan API
router.get('/get-village', getVillageData);

// Route to fetch weather data
router.get('/weather', getWeatherData);
<<<<<<< HEAD
router.get('/latlong', getLatLong);
=======
>>>>>>> 43e5dc84bbb2a1c1e6a961b4e219aa14d5207405

export default router;