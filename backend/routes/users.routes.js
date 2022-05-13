const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users.controller');

router.post('/users', UserController.addNewUser);

module.exports = router;

