import axios from "axios";
import dotenv from "dotenv";
import weatherModel from "../models/weather.model.js";

dotenv.config();

const getWeatherData = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: "Latitude and Longitude are required" });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      console.error("Weather API key is missing in the .env file");
      return res
        .status(500)
        .json({ error: "Internal server error: Missing API key" });
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await axios.get(weatherUrl);
    const weatherData = response.data;

    // Save to MongoDB with explicit mapping to avoid type issues
    const newWeather = new weatherModel({
      coord: weatherData.coord,
      weather: weatherData.weather,
      main: weatherData.main,
      visibility: weatherData.visibility,
      wind: weatherData.wind,
      rain: weatherData.rain || {},
      clouds: weatherData.clouds,
      dt: weatherData.dt,
      sys: {
        type: weatherData.sys.type,
        id: weatherData.sys.id,
        country: weatherData.sys.country,
        sunrise: weatherData.sys.sunrise,
        sunset: weatherData.sys.sunset
      },
      timezone: weatherData.timezone,
      name: weatherData.name,
      cod: weatherData.cod,
    });
    
    await newWeather.save();

    res.json(weatherData);
  } catch (error) {
    console.error("Weather API error:", error);
    res.status(500).json({
      error: "Failed to fetch or save weather data",
      details: error.message
    });
  }
};

export default getWeatherData;