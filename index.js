const server = require('./server');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

server();
