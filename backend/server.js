import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import dataRoutes from "./routes/data.routes.js"
import authRoutes from "./routes/auth.routes.js"

import connectDB from './Db/connectDb.js';
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

connectDB();

app.use('/api',dataRoutes)
app.use('/auth',authRoutes)

// Sample Route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
