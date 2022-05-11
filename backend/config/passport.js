const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL,
    },
    function(token, tokenSecret, profile, done) {
      // testing
      console.log('===== GOOGLE PROFILE =======');
      console.log(profile);
      console.log('======== END ===========');
      // code
      const { emails, displayName } = profile;
      const email = emails[0].value;

      User.findOne({ email: { $eq: email } }, (err, userMatch) => {
        // handle errors here:
        if (err) {
          console.log('Error!! trying to find user with email');
          console.log(err);
          return done(null, false);
        }
        // if there is already someone with that googleId
        if (userMatch) {
          return done(null, userMatch);
        } else {
          // if no user in our db, create a new user with that googleId
          console.log('====== PRE SAVE =======');
          console.log(displayName);
          console.log(profile);
          console.log('====== post save ....');
          const newGoogleUser = new User({
            displayName: displayName,
            email: email,
          });
          // save this user
          newGoogleUser.save((err, savedUser) => {
            if (err) {
              console.log('Error!! saving the new google user');
              console.log(err);
              return done(null, false);
            } else {
              return done(null, savedUser);
            }
          }); // closes newGoogleUser.save
        }
      }); // closes User.findONe
    }
  )
);

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});

