// server/passport.js
const passport       = require('passport');                 // ← ADD THIS
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:  process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      // … your user‑lookup / create logic …
      return done(null, profile);
    }
  )
);
app.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true
  }),
  function(req, res) {
    // Redirect to your frontend dashboard after login
    res.redirect('https://to-do-list-sigma-nine-70.vercel.app');
  }
);


// (de)serialize if you use sessions
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;   // optional but convenient
