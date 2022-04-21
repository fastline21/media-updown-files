const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { root } = require('./../utils/getDir');

const { md5Hash } = require('./hashController');

const saveMedia = async (body, files) => {
	const { name, urls: stringURL } = body;

	const { images: uploadImage = [], videos: uploadVideo = [] } = files || {};

	const images = !Array.isArray(uploadImage)
		? [uploadImage]
		: [...uploadImage];
	const videos = !Array.isArray(uploadVideo)
		? [uploadVideo]
		: [...uploadVideo];

	const urls = JSON.parse(stringURL);

	const dir = path.join(root, 'public', name);
	const info = path.join(dir, 'info.json');

	const downloadedImage = [];
	const downloadedVideo = [];
	const uploadedImage = [];
	const uploadedVideo = [];
	const errors = [];

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	if (!fs.existsSync(info)) {
		fs.writeFileSync(
			info,
			JSON.stringify({
				name: '',
				downloadedImage: [],
				downloadedVideo: [],
				uploadedImage: [],
				uploadedVideo: [],
				total: 0,
			})
		);
	}

	const readInfo = fs.readFileSync(info);
	const readData = JSON.parse(readInfo);

	if (urls.length > 0) {
		console.log(`Total URL Images: ${urls.length}`);

		for (let count = 0; count < urls.length; count++) {
			const url = urls[count];
			const fileExt = path.extname(url).split('?')[0];
			const fileName = uuidv4();
			const file = `${fileName}${fileExt}`;
			const uploadPath = path.resolve(dir, file);
			const uploadWriter = fs.createWriteStream(uploadPath);

			const currentImageCount = count + 1;

			try {
				console.log(`Fetching image: ${currentImageCount}`);
				console.log(`File: ${file}`);

				const imageLinkResponse = await axios.default({
					method: 'GET',
					url,
					responseType: 'stream',
				});

				console.log(`download start: ${currentImageCount}`);
				imageLinkResponse.data.pipe(uploadWriter);

				await new Promise((resolve, reject) => {
					uploadWriter.on('finish', resolve);
					uploadWriter.on('error', reject);
				});

				console.log(`download complete: ${currentImageCount}`);

				const currentFile = path.join(dir, file);
				const md5HashFile = md5Hash(currentFile);

				downloadedImage.push({
					filename: file,
					url,
					md5: md5HashFile,
				});
			} catch (error) {
				console.error(`Error Occurred: ${error.message}`);
				errors.push(url);
			}
		}

		console.log(`Total Download: ${downloadedImage.length}`);
		console.log(`Total Failed: ${errors.length}`);
	}

	if (images.length > 0) {
		images.map((image) => {
			try {
				const upload = uploadFiles(image, dir);
				uploadedImage.push(upload);
			} catch (error) {
				console.log(error);
				errors.push(error);
			}
		});
		console.log(`Total Upload: ${uploadedImage.length}`);
		console.log(`Total Failed: ${errors.length}`);
	}

	if (videos.length > 0) {
		videos.map((video) => {
			try {
				const upload = uploadFiles(video, dir);
				uploadedVideo.push(upload);
			} catch (error) {
				errors.push(error);
			}
		});
		console.log(`Total Upload: ${uploadedVideo.length}`);
		console.log(`Total Failed: ${errors.length}`);
	}

	const updateData = {
		...readData,
		name,
		downloadedImage: [
			...(readData.downloadedImage || ''),
			...downloadedImage,
		],
		downloadedVideo: [
			...(readData.downloadedVideo || ''),
			...downloadedVideo,
		],
		uploadedImage: [...(readData.uploadedImage || ''), ...uploadedImage],
		uploadedVideo: [...(readData.uploadedVideo || ''), ...uploadedVideo],
		total:
			readData.total +
			(downloadedImage.length +
				downloadedVideo.length +
				uploadedImage.length +
				uploadedVideo.length),
	};

	fs.writeFileSync(info, JSON.stringify(updateData));

	return {
		downloadedImage,
		downloadedVideo,
		uploadedImage,
		uploadedVideo,
		errors,
	};
};

const uploadFiles = (uploadFile, dir) => {
	const fileExt = path.extname(uploadFile.name);
	const fileName = uuidv4();
	const file = `${fileName}${fileExt}`;
	const uploadPath = path.resolve(dir, file);
	try {
		uploadFile.mv(uploadPath);

		console.log(`upload complete: ${uploadFile.name}`);

		return {
			filename: file,
			original: uploadFile.name,
			md5: uploadFile.md5,
		};
	} catch (error) {
		console.error(`Error Occurred: ${error.message}`);
		throw Error(file);
	}
};

module.exports = {
	saveMedia,
};
