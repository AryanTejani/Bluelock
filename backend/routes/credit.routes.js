import express from "express";
import { storeRiskData, getRiskScores } from "../controllers/credit.controller.js";

const router = express.Router();

// Route to store risk data and predict risk score
router.post("/store", storeRiskData);

// Route to get all stored risk scores
router.get("/scores", getRiskScores);

export default router;
