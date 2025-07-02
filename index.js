import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import metal from './routes/metal.js';


const app = express();
// ✅ Middleware to parse JSON
app.use(express.json());

//Cors policy
app.use(cors()); 

dotenv.config();
const PORT = process.env.PORT || 3005;

//Connect Database
connectDB();

// Home route
app.get("/", (req, res) => {
  res.send("✅ Admin Server is up and running.");
});

//Load Routes
app.use('/api/metals', metal);

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err.message);
  res.status(500).json({ 
    success: false, 
    message: "Internal server error" 
  });
});


app.listen(PORT, ()=>{
    console.log(`🚀 Server started successfully on port ${PORT}`);
})

