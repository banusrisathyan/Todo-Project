const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const router = express.Router();

// 1. Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://todo-backend-a8kh.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
        });
      }

      return done(null, user);
    }
  )
);

// 2. Configure GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://todo-backend-a8kh.onrender.com/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ githubId: profile.id });

      if (!user) {
        user = await User.create({
          githubId: profile.id,
          name: profile.username,
          email: profile.emails?.[0]?.value || "",
        });
      }

      return done(null, user);
    }
  )
);

// 3. Passport session setup (not using sessions, but required for initialization)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

// 4. Google login route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 5. Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.redirect(`https://todo-project-tau-one.vercel.app?token=${token}`);
  }
);

// 6. GitHub login route
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// 7. GitHub callback route
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.redirect(`https://todo-project-tau-one.vercel.app?token=${token}`);
  }
);

module.exports = router;
