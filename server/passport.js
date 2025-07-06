// server/passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      // ...your user logic...
      return done(null, profile);
    }
  )
);
