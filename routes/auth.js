var express = require('express');
var passport = require('passport');

var router = express.Router();

router.route('/login')
  .get(function (req, res, next) {
      res.render('auth/login');
  });

router.route('/logout')
  .get(function (req, res, next) {
    req.logout();
    res.redirect('/auth/login');
  });

router.route('/facebook/')
  .get(passport.authenticate('facebook'));

router.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
          successRedirect : '/chat/chat',
          failureRedirect : '/auth/login'
      }));

module.exports = router;
