const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const isLogged = require('../config/isLogged');

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), AuthController.loginUser);

router.get('/auth.logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/logged', isLogged, (req, res) => {
  res.redirect('http://localhost:3000/');
});

module.exports = router;
