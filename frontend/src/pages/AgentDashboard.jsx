import React, { useState, useEffect } from "react";
import axios from "axios";

const AgentDashboard = () => {
  const [cibilScore, setCibilScore] = useState(null);
  const [creditRisk, setCreditRisk] = useState(null);
  const [formData, setFormData] = useState({ cibilScore: "", creditRisk: "" });

  useEffect(() => {
    // Fetch CIBIL Score and Credit Risk Assessment from the API
    axios
      .get("/api/farmer/cibil-score")
      .then((response) => {
        setCibilScore(response.data.cibilScore);
      })
      .catch((error) => {
        console.error("Error fetching CIBIL Score:", error);
      });

    axios
      .get("/api/farmer/credit-risk")
      .then((response) => {
        setCreditRisk(response.data.creditRisk);
      })
      .catch((error) => {
        console.error("Error fetching Credit Risk Assessment:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/agent/submit", formData)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Agent Dashboard</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Farmer CIBIL Score</h2>
        {cibilScore !== null ? (
          <p className="text-lg font-medium">{cibilScore}</p>
        ) : (
          <p className="text-gray-500 italic">Loading...</p>
        )}
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Credit Risk Assessment</h2>
        {creditRisk !== null ? (
          <p className="text-lg font-medium">{creditRisk}</p>
        ) : (
          <p className="text-gray-500 italic">Loading...</p>
        )}
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Update Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cibilScore">
              CIBIL Score:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cibilScore"
              type="text"
              name="cibilScore"
              value={formData.cibilScore}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="creditRisk">
              Credit Risk:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="creditRisk"
              type="text"
              name="creditRisk"
              value={formData.creditRisk}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentDashboard;
