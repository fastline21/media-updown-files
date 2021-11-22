import React, { useState, useCallback, useEffect } from 'react';
import {
	Typography,
	Container,
	Box,
	TextField,
	Button,
	LinearProgress,
} from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import {
	Upload as UploadIcon,
	Image as ImageIcon,
	OndemandVideo as OndemandVideoIcon,
} from '@mui/icons-material';

import convertStringToArray from 'utils/convertStringToArray';
import getPageTitle from 'utils/getPageTitle';

import { saveMedia, clearSuccessMedia } from 'actions/mediaAction';

import DialogMedia from 'components/DialogMedia/DialogMedia';
import Media from 'components/Media';
import MediaTable from 'components/MediaTable';
import ActionMenu from 'components/ActionMenu';

const Home = ({
	mediaState: { media, error, loading, success },
	saveMedia,
	clearSuccessMedia,
}) => {
	const { enqueueSnackbar } = useSnackbar();

	const initialFormData = {
		name: '',
		urls: '',
		images: [],
		videos: [],
	};

	const initialDialogContent = {
		open: false,
		title: 'Media',
		medias: [],
		type: 'media',
		index: '',
	};

	const [formData, setFormData] = useState(initialFormData);

	const [dialogContent, setDialogContent] = useState(initialDialogContent);

	const { name, urls, images, videos } = formData;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const convertedURL = convertStringToArray(urls);

		const isNotFoundFiles =
			convertedURL.length === 0 &&
			images.length === 0 &&
			videos.length === 0;

		if (!name || isNotFoundFiles) {
			enqueueSnackbar(`Not found`, {
				variant: 'error',
			});
			return;
		}

		const newFormData = new FormData();
		newFormData.append('name', name);
		newFormData.append('urls', convertedURL);

		images.forEach((image) => {
			newFormData.append('images', image);
		});

		videos.forEach((video) => {
			newFormData.append('videos', video);
		});

		saveMedia(newFormData);

		setFormData(initialFormData);
	};

	const onDrop = useCallback(
		(acceptedFiles) => {
			const acceptImages = [];
			const acceptVideos = [];

			acceptedFiles.forEach((acceptedFile) => {
				const { type } = acceptedFile;

				if (type.includes('image')) {
					acceptImages.push(acceptedFile);
				} else if (type.includes('video')) {
					acceptVideos.push(acceptedFile);
				}

				enqueueSnackbar(`Success adding ${type}`, {
					variant: 'success',
				});
			});

			setFormData({
				...formData,
				images: [...images, ...acceptImages],
				videos: [...videos, ...acceptVideos],
			});
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[formData, images, videos]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	const handleRemoveMedia = (type, key) => {
		const removeMedia = formData[type].filter(
			(element, index) => index !== key
		);

		setFormData({
			...formData,
			[type]: removeMedia,
		});
	};

	const handleClickOpenDialog = ({ title, type, index }) => {
		setDialogContent({ open: true, title, type, index });
	};

	const handleCloseDialog = (isRemoved, type, index) => {
		if (isRemoved) {
			handleRemoveMedia(type, index);
		}
		enqueueSnackbar(`Success remove ${type}`, { variant: 'success' });
		setDialogContent(initialDialogContent);
	};

	const clearFiles = (type = '') => {
		if (type === '') {
			setFormData({
				...formData,
				urls: '',
				images: [],
				videos: [],
			});
		} else {
			setFormData({
				...formData,
				[type]: type === 'urls' ? '' : [],
			});
		}

		enqueueSnackbar(`Success clear ${type || 'all'}`, {
			variant: 'success',
		});
	};

	useEffect(() => {
		if (success) {
			enqueueSnackbar(`Success upload/download media files`, {
				variant: 'success',
			});
			clearSuccessMedia();
		}

		if (error) {
			enqueueSnackbar(`${error.message}`, {
				variant: 'error',
			});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [success, error]);

	return (
		<div>
			<Helmet>
				<title>{getPageTitle('Home')}</title>
			</Helmet>
			<DialogMedia
				isOpen={dialogContent.open}
				title={dialogContent.title}
				type={dialogContent.type}
				index={dialogContent.index}
				handleCloseDialog={(isRemoved, type, index) =>
					handleCloseDialog(isRemoved, type, index)
				}
			/>
			<Box sx={{ paddingTop: 8, height: 4 }}>
				{loading && <LinearProgress />}
			</Box>
			<Container fixed>
				<Box
					sx={{
						marginTop: 8,
						marginBottom: 5,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box component='form' onSubmit={handleSubmit}>
						<TextField
							margin='normal'
							id='name'
							label='Name'
							variant='outlined'
							name='name'
							required
							value={name}
							onChange={handleChange}
							fullWidth
						/>
						<TextField
							margin='normal'
							id='urls'
							label='URLs'
							variant='outlined'
							name='urls'
							value={urls}
							onChange={handleChange}
							multiline
							fullWidth
						/>
						<Box
							component='div'
							sx={{ marginTop: '16px' }}
							{...getRootProps()}
						>
							<input {...getInputProps()} />
							{isDragActive ? (
								<Box
									sx={{
										height: 60,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										border: '1px dashed grey',
									}}
								>
									<Typography>
										<UploadIcon />
									</Typography>
								</Box>
							) : (
								<Box
									sx={{
										height: 60,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										border: '1px dashed grey',
									}}
								>
									<ImageIcon />
									<Typography
										sx={{ marginLeft: 3, marginRight: 3 }}
									>
										/
									</Typography>
									<OndemandVideoIcon />
								</Box>
							)}
						</Box>
						<Button
							type='submit'
							variant='contained'
							fullWidth
							sx={{ mt: 3, mb: 2 }}
							size='large'
						>
							Submit
						</Button>
					</Box>
				</Box>
				<Box sx={{ marginBottom: 15 }}>
					<Media
						title='Images'
						medias={images}
						type='images'
						actionTitle='Image'
						handleClickOpenDialog={({ title, type, index }) =>
							handleClickOpenDialog({ title, type, index })
						}
					/>
					<Media
						title='Videos'
						medias={videos}
						type='videos'
						actionTitle='Video'
						handleClickOpenDialog={({ title, type, index }) =>
							handleClickOpenDialog({ title, type, index })
						}
					/>
				</Box>
				<MediaTable />
			</Container>
			<ActionMenu clearFiles={(type = '') => clearFiles(type)} />
		</div>
	);
};

Home.propTypes = {
	mediaState: PropTypes.object.isRequired,
	saveMedia: PropTypes.func.isRequired,
	clearSuccessMedia: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	mediaState: state.mediaState,
});

export default connect(mapStateToProps, {
	saveMedia,
	clearSuccessMedia,
})(Home);
