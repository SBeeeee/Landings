import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.models";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        // Check if user already exists by googleId
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if a user with this email exists
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        if (email) {
            user = await User.findOne({ email });
            if (user) {
                // Link googleId to existing user
                user.googleId = profile.id;
                await user.save();
                return done(null, user);
            }
        }

        // Create new user
        // Ensure username is unique by appending a random suffix
        let baseUsername = profile.displayName ? profile.displayName.replace(/\s+/g, '').toLowerCase() : `user_${profile.id}`;
        let username = `${baseUsername}_${Math.floor(Math.random() * 10000)}`;

        const newUser = await User.create({
          googleId: profile.id,
          username: username,
          email: email || `${profile.id}@google.com`,
          // Password is not required since googleId is present
        });

        return done(null, newUser);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

export default passport;
