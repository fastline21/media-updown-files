const { Router } = require('express');
const router = new Router();

const expressWrapper = require('./../utils/expressWrapper');

const { fetchOutput } = require('./../controllers/outputController');

router.get(
	'/',
	expressWrapper(() => fetchOutput())
);

module.exports = router;
