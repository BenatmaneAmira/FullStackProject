// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./Routes/userRoutes');
const bookRoutes = require('./Routes/bookRoutes');
dotenv.config();

const app = express();
app.use(express.json());

connectDB();
const cors = require("cors")
app.use(cors({
    origin: 'http://localhost:5173',
  }));
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
