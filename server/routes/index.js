const { Router } = require('express');
const router = new Router();

// Media route
router.use('/media', require('./media'));

// Output route
router.use('/output', require('./output'));

module.exports = router;
