import React from 'react';
import {
	Typography,
	Card,
	CardMedia,
	Grid,
	CardActions,
	CardContent,
	Stack,
	Button,
} from '@mui/material';

import excerptString from 'utils/excerptString';

const Media = ({ title, medias, type, actionTitle, handleClickOpenDialog }) => {
	return (
		medias.length > 0 && (
			<>
				<Typography sx={{ pt: 3 }}>{title}:</Typography>
				<Grid container spacing={2}>
					{medias.map((media, index) => {
						return (
							<Grid item xs={3} key={index}>
								<Card variant='outlined'>
									<CardMedia
										component={
											type === 'images' ? 'img' : 'video'
										}
										image={URL.createObjectURL(media)}
										alt={media.name}
										loading='lazy'
										height={300}
									/>
									<CardContent>
										<Typography
											variant='h6'
											component='div'
										>
											No. {index + 1}
										</Typography>
										<Typography>
											{excerptString(media.name)}
										</Typography>
									</CardContent>
									<CardActions>
										<Stack
											direction='row'
											justifyContent='space-between'
											alignItems='center'
											spacing={2}
											sx={{ width: '100%' }}
										>
											<Button
												size='small'
												onClick={() => {
													handleClickOpenDialog({
														title: media.name,
														type,
														index,
													});
												}}
											>
												View {actionTitle}
											</Button>
											<Button
												size='small'
												onClick={() => {
													handleClickOpenDialog({
														title: media.name,
														type,
														index,
													});
												}}
											>
												Remove {actionTitle}
											</Button>
										</Stack>
									</CardActions>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</>
		)
	);
};

export default Media;
