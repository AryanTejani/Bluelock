import mongoose from 'mongoose';

<<<<<<< HEAD
const WeatherSchema = new mongoose.Schema(
  {
=======
const WeatherSchema = new mongoose.Schema({
    village: { type: mongoose.Schema.Types.ObjectId, ref: 'Village', required: true }, // Reference to Village
>>>>>>> 43e5dc84bbb2a1c1e6a961b4e219aa14d5207405
    coord: {
      lon: Number,
      lat: Number,
    },
    weather: [
      {
        id: Number,
        main: String,
        description: String,
        icon: String,
      },
    ],
    main: {
      temp: Number,
      feels_like: Number,
      temp_min: Number,
      temp_max: Number,
      pressure: Number,
      humidity: Number,
      sea_level: Number,
      grnd_level: Number,
    },
    visibility: Number,
    wind: {
      speed: Number,
      deg: Number,
      gust: Number,
    },
    rain: {
      '1h': { type: Number, required: false },
    },
    clouds: {
      all: Number,
    },
    dt: Number,
    sys: {
      type: { type: Number },
      id: Number,
      country: String,
      sunrise: Number,
      sunset: Number,
    },
    timezone: Number,
    name: String,
    cod: Number,
  },
  { timestamps: true }
);

<<<<<<< HEAD
const Weather = mongoose.model('Weather', WeatherSchema);

export default Weather;
=======
export default mongoose.model('Weather', WeatherSchema);
>>>>>>> 43e5dc84bbb2a1c1e6a961b4e219aa14d5207405
