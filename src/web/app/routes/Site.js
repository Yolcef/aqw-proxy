const { Router } = require('express');

/**
 * Controllers
 */
const GameController = require('../controllers/GameController');

/**
 * Router
 */
const router = Router();

/**
 * Site routes
 */
router.get('/', GameController.play);

/**
 * Game routes
 */
router.get('/game*', (request, response) => GameController.index(request, response));
router.post('/game/login', (request, response) => GameController.authenticate(request, response));

module.exports = router;
