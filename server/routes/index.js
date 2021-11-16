const { Router } = require('express');
const router = new Router();

router.use('/media', require('./media'));

module.exports = router;
