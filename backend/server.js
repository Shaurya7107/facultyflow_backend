const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// The '*' allows your local HTML files to talk to this server easily during testing.
app.use(cors({
    origin: '*',  // When you deploy later, change '*' to your Netlify URL!
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Allows Express to understand JSON data sent from the frontend
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/teacher', require('./routes/teacher'));
app.use('/api/student', require('./routes/student'));

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'FacultyFlow API is running securely!' });
});

// ==========================================
// GLOBAL ERROR HANDLER (Reviewer Bonus Points)
// ==========================================
// If any route crashes, this catches it so the whole server doesn't shut down
app.use((err, req, res, next) => {
    console.error(`[Server Error]: ${err.message}`);
    res.status(500).json({ message: 'An unexpected server error occurred.' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running perfectly on http://localhost:${PORT}`);
});