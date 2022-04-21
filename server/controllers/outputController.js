const fs = require('fs');
const path = require('path');

const { root } = require('./../utils/getDir');

const loadMedia = async () => {
	const outputDir = path.join(root, 'output');
	console.log({ outputDir });
	return fs.readdirSync(outputDir);
};

module.exports = { loadMedia };
