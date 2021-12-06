const fs = require('fs');
const path = require('path');

const { root } = require('./../utils/getDir');

const fetchOutput = async () => {
	const publicDir = path.join(root, 'public');

	const public = fs.readdirSync(publicDir);

	const output = [];
	public.forEach((data) => {
		const stats = fs.statSync(path.join(publicDir, data));

		if (stats.isDirectory()) {
			const current = fs.readdirSync(path.join(publicDir, data));

			const result = [];
			let info = '';
			current.forEach((file) => {
				if (file === 'info.json') {
					info = JSON.parse(
						fs.readFileSync(path.join(publicDir, data, file))
					);
				}
			});

			output.push({ info, result });
		}
	});

	return output;
};

module.exports = {
	fetchOutput,
};
