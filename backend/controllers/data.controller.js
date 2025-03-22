import axios from "axios";
import dotenv from "dotenv";
import weatherModel from "../models/weather.model.js";
import villageModel from "../models/village.model.js";
import Form from "../models/form.model.js";

dotenv.config();

// 1. Controller for adding a village manually through POST request
export const addVillage = async (req, res) => {
  try {
    const { name, dist_name, state_name } = req.body;

    if (!name || !dist_name || !state_name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the exact village entry already exists
    let existingVillage = await Form.findOne({ name, dist_name, state_name });

    if (existingVillage) {
      return res
        .status(400)
        .json({ error: "This village entry already exists" });
    }

    // Create new village entry in Form model
    const newVillage = new Form({ name, dist_name, state_name });
    await newVillage.save();

    // Now fetch coordinates from Bhuvan API
    try {
      const bhuvanResponse = await fetchVillageDataFromBhuvan(village);
      console.log("Bhuvan API full response:", JSON.stringify(bhuvanResponse));

      // Check if response is valid
      if (
        !bhuvanResponse ||
        !Array.isArray(bhuvanResponse) ||
        bhuvanResponse.length === 0
      ) {
        return res.status(404).json({
          error: "Invalid or empty response from Bhuvan API",
          rawResponse: bhuvanResponse,
        });
      }

      // Filter the correct village using district and state
      const matchingVillageData = filterVillageByDistrictAndState(
        bhuvanResponse,
        dist_name,
        state_name
      );

      if (matchingVillageData) {
        // Save to village model
        await saveToVillageModel(
          name,
          dist_name,
          state_name,
          matchingVillageData.latitude,
          matchingVillageData.longitude
        );
      }
    } catch (bhuvanError) {
      console.error("Error fetching data from Bhuvan API:", bhuvanError);
      // Continue with response - we've already saved the basic info
    }

    res.json({ message: "Village added successfully", village: newVillage });
  } catch (error) {
    console.error("Error adding village:", error);
    res
      .status(500)
      .json({ error: "Failed to add village", details: error.message });
  }
};

// 2. Controller to get village data from Bhuvan API
export const getVillageData = async (req, res) => {
  try {
    const { village } = req.query;

    if (!village) {
      return res.status(400).json({ error: "Village name is required" });
    }

    const bhuvanResponse = await fetchVillageDataFromBhuvan(village);

    res.json({
      message: "Village data fetched successfully",
      data: bhuvanResponse,
    });
  } catch (error) {
    console.error("Error fetching village data:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch village data", details: error.message });
  }
};

// 3. Controller to get weather data
// Controller to get weather data
export const getWeatherData = async (req, res) => {
  try {
    const { village, dist_name, state_name } = req.query;

    if (!village || !dist_name || !state_name) {
      return res.status(400).json({
        error: "Village name, district name, and state name are required",
      });
    }

    console.log("Getting weather data for:", village, dist_name, state_name);

    // First check if we already have this village in our database
    const villageDoc = await villageModel.findOne({
      name: new RegExp(`^${village}$`, "i"),
    });

    if (!villageDoc) {
      console.log("Village not found in database, fetching from Bhuvan API");
      // If not found in database, fetch from Bhuvan API
      try {
        const bhuvanResponse = await fetchVillageDataFromBhuvan(village);
        console.log(
          "Bhuvan API Response:",
          JSON.stringify(bhuvanResponse).substring(0, 200) + "..."
        );

        if (!bhuvanResponse || bhuvanResponse.length === 0) {
          return res
            .status(404)
            .json({ error: "No villages found in Bhuvan API response" });
        }

        const matchingVillageData = filterVillageByDistrictAndState(
          bhuvanResponse,
          dist_name,
          state_name
        );
        console.log("Matching village data:", matchingVillageData);

        // In getWeatherData controller, replace the existing check for matchingVillageData with:
        if (!matchingVillageData) {
          // Log available data for debugging
          console.log(
            "No matching village found. Available data:",
            bhuvanResponse
          );

          // Check if any entry at least matches the state
          const stateMatch = bhuvanResponse.find((v) => {
            const state = v.state_name || v.state || "";
            return state.toLowerCase() === state_name.toLowerCase();
          });

          if (stateMatch) {
            // If we have a state match, use its data but log a warning
            console.log("Using partial match (state only):", stateMatch);

            const latitude = stateMatch.latitude || stateMatch.lat;
            const longitude =
              stateMatch.longitude || stateMatch.lng || stateMatch.lon;

            if (!latitude || !longitude) {
              return res.status(404).json({
                error: "Coordinates not found for this village",
                villageData: stateMatch,
              });
            }

            // Save to village model with warning about partial match
            const savedVillage = await saveToVillageModel(
              village,
              dist_name, // We'll use the user-provided district name
              state_name,
              latitude,
              longitude
            );

            // Now fetch and save weather data
            try {
              const weatherData = await fetchAndSaveWeatherData(
                savedVillage._id,
                latitude,
                longitude
              );

              return res.json({
                message: "Weather data fetched successfully (state match only)",
                village: village,
                district: dist_name,
                state: state_name,
                latitude: latitude,
                longitude: longitude,
                weather: weatherData,
                note: "Used partial match (state only)",
              });
            } catch (weatherError) {
              // Handle weather error...
            }
          } else {
            // No match at all
            return res.status(404).json({
              error:
                "Village not found in Bhuvan API with matching district and state",
              availableOptions: bhuvanResponse.map((v) => ({
                district: v.district_name || v.district || "unknown",
                state: v.state_name || v.state || "unknown",
              })),
            });
          }
        }

        // Extract latitude and longitude - handle different possible field names
        const latitude =
          matchingVillageData.latitude || matchingVillageData.lat;
        const longitude =
          matchingVillageData.longitude ||
          matchingVillageData.lng ||
          matchingVillageData.lon;

        if (!latitude || !longitude) {
          return res.status(404).json({
            error: "Coordinates not found for this village",
            villageData: matchingVillageData,
          });
        }

        // Save to village model
        const savedVillage = await saveToVillageModel(
          village,
          dist_name,
          state_name,
          latitude,
          longitude
        );

        // Now fetch and save weather data
        try {
          const weatherData = await fetchAndSaveWeatherData(
            savedVillage._id,
            latitude,
            longitude
          );

          return res.json({
            message: "Weather data fetched successfully",
            village: village,
            district: dist_name,
            state: state_name,
            latitude: latitude,
            longitude: longitude,
            weather: weatherData,
          });
        } catch (weatherError) {
          console.error("Error fetching weather data:", weatherError);
          return res.status(500).json({
            error: "Failed to fetch weather data",
            coordinates: { latitude, longitude },
            details: weatherError.message,
          });
        }
      } catch (bhuvanError) {
        console.error("Error fetching data from Bhuvan API:", bhuvanError);
        return res.status(500).json({
          error: "Failed to fetch village data from Bhuvan API",
          details: bhuvanError.message,
        });
      }
    } else {
      console.log("Village found in database");
      // Village exists in our database, find matching location
      const matchingLocation = villageDoc.locations.find(
        (location) =>
          location.dist_name.toLowerCase() === dist_name.toLowerCase() &&
          location.state_name.toLowerCase() === state_name.toLowerCase()
      );

      if (!matchingLocation) {
        console.log("Location not found in database, fetching from Bhuvan API");
        // Village exists but not with this district/state combination
        try {
          // Try to find from Bhuvan API
          const bhuvanResponse = await fetchVillageDataFromBhuvan(village);
          console.log(
            "Bhuvan API Response for existing village:",
            JSON.stringify(bhuvanResponse).substring(0, 200) + "..."
          );

          const matchingVillageData = filterVillageByDistrictAndState(
            bhuvanResponse,
            dist_name,
            state_name
          );
          console.log(
            "Matching village data for existing village:",
            matchingVillageData
          );

          if (!matchingVillageData) {
            return res.status(404).json({
              error: "Village with this district and state not found",
              availableLocations: villageDoc.locations,
            });
          }

          // Extract latitude and longitude - handle different possible field names
          const latitude =
            matchingVillageData.latitude || matchingVillageData.lat;
          const longitude =
            matchingVillageData.longitude ||
            matchingVillageData.lng ||
            matchingVillageData.lon;

          if (!latitude || !longitude) {
            return res.status(404).json({
              error: "Coordinates not found for this village",
              villageData: matchingVillageData,
            });
          }

          // Add new location to existing village
          villageDoc.locations.push({
            dist_name,
            state_name,
            latitude,
            longitude,
          });

          await villageDoc.save();
          console.log("New location added to existing village");

          // Fetch and save weather data
          try {
            const weatherData = await fetchAndSaveWeatherData(
              villageDoc._id,
              latitude,
              longitude
            );

            return res.json({
              message: "Weather data fetched successfully for new location",
              village: village,
              district: dist_name,
              state: state_name,
              latitude,
              longitude,
              weather: weatherData,
            });
          } catch (weatherError) {
            console.error(
              "Error fetching weather data for new location:",
              weatherError
            );
            return res.status(500).json({
              error: "Failed to fetch weather data",
              coordinates: { latitude, longitude },
              details: weatherError.message,
            });
          }
        } catch (bhuvanError) {
          console.error(
            "Error fetching data from Bhuvan API for existing village:",
            bhuvanError
          );
          return res.status(500).json({
            error: "Failed to fetch village data from Bhuvan API",
            details: bhuvanError.message,
          });
        }
      } else {
        console.log("Location found in database, using existing coordinates");
        // We have this village with this district/state - use existing coordinates
        try {
          const weatherData = await fetchAndSaveWeatherData(
            villageDoc._id,
            matchingLocation.latitude,
            matchingLocation.longitude
          );

          return res.json({
            message:
              "Weather data fetched successfully using existing location",
            village: village,
            district: dist_name,
            state: state_name,
            latitude: matchingLocation.latitude,
            longitude: matchingLocation.longitude,
            weather: weatherData,
          });
        } catch (weatherError) {
          console.error(
            "Error fetching weather data for existing location:",
            weatherError
          );
          return res.status(500).json({
            error: "Failed to fetch weather data",
            coordinates: {
              latitude: matchingLocation.latitude,
              longitude: matchingLocation.longitude,
            },
            details: weatherError.message,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error in weather data controller:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch weather data", details: error.message });
  }
};

// Helper function to fetch data from Bhuvan API
async function fetchVillageDataFromBhuvan(villageName) {
  try {
    console.log(`Fetching data for village: ${villageName}`);
    const bhuvanApiUrl = `https://bhuvan-app1.nrsc.gov.in/api/api_proximity/curl_village_geocode.php?village=${encodeURIComponent(
      villageName
    )}&token=${process.env.BHUVAN_API_KEY}`;

    console.log(`Calling Bhuvan API at: ${bhuvanApiUrl}`);
    const response = await axios.get(bhuvanApiUrl);
    console.log(`Bhuvan API response status: ${response.status}`);
    console.log(`Response data: ${JSON.stringify(response.data)}`);

    if (!response.data || !Array.isArray(response.data)) {
      console.error("Invalid response format from Bhuvan API:", response.data);
    } else if (response.data.length === 0) {
      console.log("Empty array returned from Bhuvan API");
    } else {
      console.log(`Found ${response.data.length} villages in Bhuvan response`);
      // Log first item structure
      console.log(
        "First village data structure:",
        Object.keys(response.data[0])
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching from Bhuvan API:", error);
    throw error;
  }
}

// Helper function to filter village by district and state
function filterVillageByDistrictAndState(bhuvanResponse, distName, stateName) {
  // Check if the response contains village data
  if (bhuvanResponse && Array.isArray(bhuvanResponse)) {
    console.log("Village data to filter:", JSON.stringify(bhuvanResponse));

    // First try to find an exact match
    const exactMatch = bhuvanResponse.find((village) => {
      const villageDistrict = village.district_name || village.district || "";
      const villageState = village.state_name || village.state || "";

      return (
        villageDistrict.toLowerCase() === distName.toLowerCase() &&
        villageState.toLowerCase() === stateName.toLowerCase()
      );
    });

    if (exactMatch) return exactMatch;

    // If no exact match, try to match by state only
    return bhuvanResponse.find((village) => {
      const villageState = village.state_name || village.state || "";
      return villageState.toLowerCase() === stateName.toLowerCase();
    });
  }
  return null;
}
// Helper function to save to village model
async function saveToVillageModel(
  villageName,
  distName,
  stateName,
  latitude,
  longitude
) {
  try {
    // Check if village already exists
    let villageDoc = await villageModel.findOne({
      name: new RegExp(`^${villageName}$`, "i"),
    });

    if (!villageDoc) {
      // Create new village
      villageDoc = new villageModel({
        name: villageName,
        locations: [
          {
            dist_name: distName,
            state_name: stateName,
            latitude: latitude,
            longitude: longitude,
          },
        ],
      });
      await villageDoc.save();
    } else {
      // Check if this specific location exists
      const locationExists = villageDoc.locations.some(
        (location) =>
          location.dist_name.toLowerCase() === distName.toLowerCase() &&
          location.state_name.toLowerCase() === stateName.toLowerCase()
      );

      if (!locationExists) {
        // Add new location
        villageDoc.locations.push({
          dist_name: distName,
          state_name: stateName,
          latitude: latitude,
          longitude: longitude,
        });
        await villageDoc.save();
      }
    }

    return villageDoc;
  } catch (error) {
    console.error("Error saving to village model:", error);
    throw error;
  }
}

// Helper function to fetch and save weather data
async function fetchAndSaveWeatherData(villageId, latitude, longitude) {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const weatherResponse = await axios.get(weatherUrl);
    const weatherData = weatherResponse.data;

    // Save weather data to MongoDB
    const newWeather = new weatherModel({
      village: villageId,
      coord: weatherData.coord,
      weather: weatherData.weather,
      main: weatherData.main,
      visibility: weatherData.visibility,
      wind: weatherData.wind,
      rain: weatherData.rain || {},
      clouds: weatherData.clouds,
      dt: weatherData.dt,
      sys: weatherData.sys,
      timezone: weatherData.timezone,
      name: weatherData.name,
      cod: weatherData.cod,
    });

    await newWeather.save();

    return weatherData;
  } catch (error) {
    console.error("Error fetching or saving weather data:", error);
    throw error;
  }
}
