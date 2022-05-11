const express = require('express');
const router = express.Router();
const passport = require('passport');
const isLogged = require('../config/isLogged');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/',
  })
);

router.get('/google/auth.logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000/');
});

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
  console.log('===== user!!======');
  console.log(req.user);
  if (req.user) {
    return res.json({ user: req.user });
  } else {
    return res.json({ user: null });
  }
});

router.post(
  '/login',
  function(req, res, next) {
    console.log(req.body);
    console.log('================');
    next();
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log('POST to /login');
    const user = JSON.parse(JSON.stringify(req.user)) ;// hack
    const cleanUser = Object.assign({}, user);
    res.json({ user: cleanUser });
  }
);

router.post('/logout', (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie('connect.sid'); // clean up!
    return res.json({ msg: 'logging you out' });
  } else {
    return res.json({ msg: 'no user to log out!' });
  }
});

module.exports = router;

