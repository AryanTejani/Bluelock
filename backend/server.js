import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
<<<<<<< HEAD
import dataRoutes from './routes/data.routes.js';
import authRoutes from './routes/auth.routes.js';
=======
import dataRoutes from "./routes/data.routes.js"
import authRoutes from "./routes/auth.routes.js"
import formRoutes from "./routes/form.routes.js"

>>>>>>> 43e5dc84bbb2a1c1e6a961b4e219aa14d5207405
import connectDB from './Db/connectDb.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
connectDB();

<<<<<<< HEAD
app.use('/api', dataRoutes);
app.use('/auth', authRoutes);

=======
app.use('/api',dataRoutes)
app.use('/auth',authRoutes)
app.use('/form',formRoutes)
>>>>>>> 43e5dc84bbb2a1c1e6a961b4e219aa14d5207405
// Sample Route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Define the port
const PORT = process.env.PORT || 5000;

// Function to start the server
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying port ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
};

// Start the server
startServer(PORT);
