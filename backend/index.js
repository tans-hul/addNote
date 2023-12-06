// app.js (or server.js)
import express from 'express';
import mongoose from 'mongoose';
import mainRouter from './routes/index.js';
import cors from 'cors'
import dotenv from 'dotenv'
const app = express();
dotenv.config()
const uri = process.env.URI
// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors())

// Middleware
app.use(express.json());
app.use('/route', mainRouter);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
  