const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const server = () => {
	const app = express();

	app.use(express.json());

	app.use(fileUpload());

	app.use(cors());

	app.use(logger('dev'));

	app.use('/api', require('./routes'));

	// Serve static assets in production
	if (process.env.NODE_ENV === 'production') {
		// Set static folder
		app.use(express.static('./../client/build'));

		app.get('*', (req, res) =>
			res.sendFile(
				path.resolve(__dirname, '..', 'client', 'build', 'index.html')
			)
		);
	}

	const port = process.env.PORT || 5000;
	app.listen(port, () => console.log(`Server running on localhost:${port}`));
};

module.exports = server;
