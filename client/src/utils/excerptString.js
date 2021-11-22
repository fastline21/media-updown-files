const excerptString = (string) => {
	const LIMIT = 20;
	let excerpt = '';

	if (string.length > LIMIT) {
		excerpt = string.substring(0, LIMIT) + '...';
	} else {
		excerpt = string;
	}

	return excerpt;
};

module.exports = excerptString;
