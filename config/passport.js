const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const User = require("../models/user");

const bcryptCompare = promisify(bcrypt.compare);

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });

          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }

          const isMatch = await bcryptCompare(password, user.password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
