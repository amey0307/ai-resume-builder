import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/user.router.js';
import dotenv from 'dotenv'

// Initialize the Express application
const app = express();
const port = 3000;

dotenv.config();

mongoose.connect(
    process.env.MONGO
)
    .then(() => {
        console.log("Mongoose is connected");
    })
    .catch((e) => {
        console.log("Lund nhi chal rha mongoose");
    })

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route to handle GET requests
app.use('/api/user', userRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
