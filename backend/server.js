const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images from /uploads path
app.use('/uploads', express.static('uploads'));

// ✅ Main route
app.use('/api/todos', require('./routes/todoRoutes'));

// ✅ Start server + connect to MongoDB Atlas
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');

    app.listen(5000, () => {
      console.log('🚀 Server running on port 5000');
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

startServer();
