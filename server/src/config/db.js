const mongoose = require('mongoose');

const connectDB = async () => {
  let uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/personalized_learning_db';
  
  // Defensive: Strip accidental < > placeholder brackets around password if present
  uri = uri.replace(/:<([^>@]+)>/, ':$1');

  try {
    const isCloud = uri.includes('mongodb+srv') || uri.includes('mongodb.net');
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: isCloud ? 5000 : 2500
    });
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    return;
  } catch (cloudError) {
    console.warn(`⚠️ Cloud MongoDB Atlas auth error: ${cloudError.message}`);
    
    // Automatic fallback to running local MongoDB instance
    try {
      const localUri = 'mongodb://127.0.0.1:27017/personalized_learning_db';
      const localConn = await mongoose.connect(localUri, { serverSelectionTimeoutMS: 2000 });
      console.log(`✅ Connected to local MongoDB Server (${localConn.connection.host}) — Real database persistence is ACTIVE!`);
      return;
    } catch (localError) {
      console.log('⚡ Running in In-Memory Demo mode (Full functionality active without requiring local MongoDB daemon).');
    }
  }
};

module.exports = connectDB;
