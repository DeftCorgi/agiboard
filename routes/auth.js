const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const User = mongoose.model('users');

// configure passport

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      // check if user exists in DB
      console.log(profile);
      const existingUser = await User.findOne({
        googleId: profile.id
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = await new User({
        googleId: profile.id,
        displayName: profile.displayName
      }).save();
      done(null, newUser);
    }
  )
);

// auth routes

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/boards');
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/current', (req, res) => res.send(req.user));
};
