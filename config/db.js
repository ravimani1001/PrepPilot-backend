
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE}`);
    console.log('MongoDB Database Connected !');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
