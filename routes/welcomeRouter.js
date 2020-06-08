const express = require('express');
const welcomeController = require('../controllers/welcome');
const router = express.Router();

router.get('/', welcomeController.getWelcomePage);

router.post('/', welcomeController.getRedirect);

module.exports = router;