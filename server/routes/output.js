const { Router } = require('express');
const router = new Router();

// Controllers
const { loadMedia } = require('./../controllers/outputController');

// Utils
const expressWrapper = require('./../utils/expressWrapper');

// Routes
router.get(
	'/',
	expressWrapper(() => loadMedia())
);

module.exports = router;
