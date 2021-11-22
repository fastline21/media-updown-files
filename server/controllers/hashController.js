const crypto = require('crypto');
const fs = require('fs');

const md5Hash = (fileDir, buffer = '') => {
	const fileBuffer = fileDir && fs.readFileSync(fileDir);
	const hash = crypto
		.createHash('md5')
		.update(fileBuffer || buffer)
		.digest('hex');

	return hash;
};

module.exports = {
	md5Hash,
};
