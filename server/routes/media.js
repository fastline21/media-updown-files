const { Router } = require('express');
const router = new Router();

const expressWrapper = require('./../utils/expressWrapper');

const { saveMedia } = require('./../controllers/mediaController');

router.post(
	'/',
	expressWrapper((req) => saveMedia(req.body))
);

module.exports = router;
