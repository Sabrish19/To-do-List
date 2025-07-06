require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
require('./passport'); // Google OAuth strategy
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://to-do-list-sigma-nine-70.vercel.app',
  ],
  credentials: true
}));

// Body parser
app.use(express.json());

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true only with HTTPS
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/tasks', taskRoutes);

// Google OAuth
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google callback
const CLIENT_URL = process.env.CLIENT_REDIRECT_URL || 'http://localhost:5173';

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: CLIENT_URL
  }),
  (req, res) => {
    res.redirect(CLIENT_URL);
  }
);

// Logout
app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect(CLIENT_URL);
  });
});

// Get logged-in user
app.get('/auth/user', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
