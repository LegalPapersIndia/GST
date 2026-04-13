require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const leadRoutes = require('./routes/leadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',           // Production mein specific origin daal sakte ho
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Important: Routes ko sahi se mount karo
app.use('/api', leadRoutes);     // ← Yeh change zaroori hai

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

console.log("Routes mounted under /api");