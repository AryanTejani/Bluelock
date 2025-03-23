import React, { useState } from "react";
import axios from "axios";

const FarmerDashboard = () => {
    const [formData, setFormData] = useState({
      state: "",
      city: "",
      crop: "",
      phSoil: "",
      area: "",
      avgTemp: "",
      rainfall: "",
      yield: "",
      avg_smlvl: "",
      soilType: "",
      nutrientLevel: "",
      creditScore: "",
    });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/farmer/submit", formData)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Farmer Dashboard</h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
              State
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="state"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">
              District
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="district"
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="crop">
              Crop
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="crop"
              type="text"
              name="crop"
              value={formData.crop}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phSoil">
              pH Soil
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phSoil"
              type="text"
              name="phSoil"
              value={formData.phSoil}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="area">
              Area
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="area"
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="temperature">
              Temperature
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="temperature"
              type="text"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rainfall">
              Rainfall
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="rainfall"
              type="text"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yield">
              Yield
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="yield"
              type="text"
              name="yield"
              value={formData.yield}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="soilMoistureLevel">
              Soil Moisture Level
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="soilMoistureLevel"
              type="text"
              name="soilMoistureLevel"
              value={formData.soilMoistureLevel}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="soilType">
              Soil Type
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="soilType"
              type="text"
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nutrientLevel">
              Nutrient Level
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nutrientLevel"
              type="text"
              name="nutrientLevel"
              value={formData.nutrientLevel}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FarmerDashboard;
