import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.models";
import dotenv from "dotenv";

dotenv.config();

const slugifyUsername = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "")
    .replace(/^_+|_+$/g, "");

const buildUniqueUsername = async (baseValue: string) => {
  const base = slugifyUsername(baseValue) || "user";
  let username = base;
  let suffix = 1;

  while (await User.findOne({ username })) {
    username = `${base}${suffix}`;
    suffix += 1;
  }

  return username;
};

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

        // Create new user with a stable, readable username.
        const emailHandle = email?.split("@")[0];
        const preferredUsername =
          emailHandle || profile.displayName || `user${profile.id}`;
        const username = await buildUniqueUsername(preferredUsername);

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
