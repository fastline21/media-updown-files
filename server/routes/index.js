const { Router } = require('express');
const router = new Router();

// Media route
router.use('/media', require('./media'));

module.exports = router;
