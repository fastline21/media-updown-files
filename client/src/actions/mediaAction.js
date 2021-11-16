import axios from 'axios';
import { SAVE_MEDIA, MEDIA_ERROR, MEDIA_LOADING } from './types';

export const saveMedia = (media) => async (dispatch) => {
	setLoading(dispatch);
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post('/api/media', media, config);

		dispatch({
			type: SAVE_MEDIA,
			payload: res.data,
		});
	} catch (error) {
		const { status, data } = error.response;
		dispatch({
			type: MEDIA_ERROR,
			payload: {
				statusCode: status,
				message: data.message,
			},
		});
	}
};

const setLoading = (dispatch) => {
	dispatch({
		type: MEDIA_LOADING,
	});
};
