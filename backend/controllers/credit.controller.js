import axios from "axios";
import { RiskModel, RiskScoreModel } from "../models/credit.models.js";

// Store data in MongoDB and get prediction from Flask API
export const storeRiskData = async (req, res) => {
    try {
        const riskData = new RiskModel(req.body);
        await riskData.save();

        const flaskResponse = await axios.post("http://127.0.0.1:8080/predict", req.body);
        const predictedRiskScore = flaskResponse.data["Predicted Risk Score (%)"];

        // Save the predicted risk score
        const riskScoreData = new RiskScoreModel({
            riskId: riskData._id,
            Predicted_Risk_Score: predictedRiskScore
        });
        await riskScoreData.save();

        res.status(201).json({ message: "Risk data stored and prediction saved", predictedRiskScore });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve stored risk scores
export const getRiskScores = async (req, res) => {
    try {
        const riskScores = await RiskScoreModel.find().populate("Predicted_Risk_Score");
        res.status(200).json(riskScores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
