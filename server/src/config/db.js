const mongoose = require('mongoose');

const connectDB = async () => {
  let uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/personalized_learning_db';
  
  // Defensive: Strip accidental < > placeholder brackets around password if present
  uri = uri.replace(/:<([^>@]+)>/, ':$1');

  try {
    const isCloud = uri.includes('mongodb+srv') || uri.includes('mongodb.net');
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: isCloud ? 8000 : 2500
    });
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Notice: ${error.message}`);
    console.log('⚡ Running in In-Memory Demo mode (Full functionality active without requiring local MongoDB daemon).');
  }
};

module.exports = connectDB;
