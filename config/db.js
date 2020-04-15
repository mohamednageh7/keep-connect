const mongoose = require('mongoose');
const db = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    // Exsit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
