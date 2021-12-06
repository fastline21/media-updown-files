import React from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
// TODO: Hide until it resolve clear files research.
import {
	// ClearAll as ClearAllIcon,
	// Clear as ClearIcon,
	Download as DownloadIcon,
} from '@mui/icons-material';

const ActionMenu = ({ clearFiles }) => {
	// TODO: Research more about clear files.
	const speedDialActions = [
		// {
		// 	icon: <ClearAllIcon />,
		// 	name: 'Clear Files',
		// 	action: () => clearFiles(),
		// },
		// {
		// 	icon: <ClearIcon />,
		// 	name: 'Clear URLs',
		// 	action: () => clearFiles('urls'),
		// },
		// {
		// 	icon: <ClearIcon />,
		// 	name: 'Clear Images',
		// 	action: () => clearFiles('images'),
		// },
		// {
		// 	icon: <ClearIcon />,
		// 	name: 'Clear Videos',
		// 	action: () => clearFiles('videos'),
		// },
		{
			icon: <DownloadIcon />,
			name: 'Download IMDb',
			action: () =>
				window.open(
					process.env.REACT_APP_IMDB_IMAGE_DOWNLOADER_URL,
					'_blank'
				),
		},
	];

	return (
		<SpeedDial
			ariaLabel="SpeedDial basic example"
			sx={{ position: 'fixed', bottom: 80, right: 16 }}
			icon={<SpeedDialIcon />}
		>
			{speedDialActions.map((speedDialAction) => (
				<SpeedDialAction
					key={speedDialAction.name}
					icon={speedDialAction.icon}
					tooltipTitle={speedDialAction.name}
					onClick={speedDialAction.action}
				/>
			))}
		</SpeedDial>
	);
};

export default ActionMenu;
