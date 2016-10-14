var express = require('express');

var router = express.Router();

router.route('/chat')
  .get(function (req, res, next) {
    console.log(req.user)
    return res.render('chat/chat', {user:req.user});
  });



module.exports = router;
