import mongoose from "mongoose";

const riskSchema = new mongoose.Schema({
    State: { type: String, required: true },
    City: { type: String, required: true },
    Crop: { type: String, required: true },
    pH_soil: { type: Number, required: true, default: 7.0 },  // Neutral pH as default
    Area_ha: { type: Number, required: true, default: 1.0 },  // Default 1 hectare
    avgTemp: { type: Number, required: true, default: 25.0 }, // Default 25°C
    Rainfall_mm: { type: Number, required: true, default: 100 }, // Default 100 mm
    Yield_ton_ha: { type: Number, required: true, default: 2.5 }, // Default 2.5 ton/ha
    Avg_smlvl: { type: Number, required: true, default: 1.0 }, // Default 1
    Soil_Type: { type: String, required: true, default: "Loamy" }, // Default soil type
    Nutrient_Level: { type: String, required: true, default: "Medium" }, // Default nutrient level
    Credit_Score: { type: Number, required: true, default: 600 }, // Default 600 credit score
    Predicted_Risk_Score: { type: Number, required: false }
}, { timestamps: true });

const RiskModel = mongoose.model("Risk", riskSchema);

const riskScoreSchema = new mongoose.Schema({
    riskId: { type: mongoose.Schema.Types.ObjectId, ref: "Risk", required: true },
    Predicted_Risk_Score: { type: Number, required: true }
}, { timestamps: true });

const RiskScoreModel = mongoose.model("RiskScore", riskScoreSchema);

export { RiskModel, RiskScoreModel };
