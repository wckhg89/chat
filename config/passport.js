var FacebookStrategy = require('passport-facebook').Strategy;

var facebookPassport = function (passport) {
  // 인증후 사용자 정보를 세션에 저장
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  // 인증후, 사용자 정보를 세션에서 읽어서 request.user에 저장
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new FacebookStrategy({
      clientID : "1664459743866458",
      clientSecret : "9f8fad6a5ec02f3a53c3e23cb2c8ab69",
      callbackURL : "http://localhost:8080/auth/facebook/callback"
    },
    function (accessToken, refereshToken, profile, done) {
      return done(null, profile);
    }));
};

module.exports = facebookPassport;
