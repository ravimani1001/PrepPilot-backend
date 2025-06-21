
const app = require('./app');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // Wait for DB connection
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to DB', err);
  }
};

startServer();
