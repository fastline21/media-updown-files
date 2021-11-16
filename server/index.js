const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const server = () => {
	const app = express();

	app.use(express.json());

	app.use(cors());

	app.use(logger('dev'));

	app.use('/api', require('./routes'));

	const port = process.env.PORT || 5000;
	app.listen(port, () => console.log(`Server running on localhost:${port}`));
};

module.exports = server;
