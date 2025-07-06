require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

require('./passport'); // Google strategy
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = 5000;

// MongoDB connection
const uri = process.env.MONGODB_URI;
console.log('Using URI:', uri ? uri.slice(0, 30) + '...' : 'undefined'); // temporary debug

mongoose.connect(uri)
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// CORS for frontend access
// server/server.js  – CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',                    // dev
      'https://to-do-list-1ttx.onrender.com',           // Vercel frontend
      process.env.FRONTEND_URL                   // optional env var
    ],
    credentials: true
  })
);


// Body parser
app.use(express.json());

// Session config
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret', // fallback prevents crash if env is missing
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // set to true if using HTTPS in production
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/tasks', taskRoutes);

// Google OAuth login
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/dashboard',
    failureRedirect: 'http://localhost:5173'
  })
);

// Logout
app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect(process.env.CLIENT_REDIRECT_URL || "http://localhost:5173/dashboard");
  });
});

// Get current logged in user
app.get('/auth/user', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
