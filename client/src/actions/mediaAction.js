import axios from 'axios';
import { SAVE_MEDIA, MEDIA_ERROR, MEDIA_LOADING, CLEAR_SUCCESS } from './types';

export const saveMedia = (data) => async (dispatch) => {
	setLoading(dispatch);

	try {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};

		const res = await axios.post('/api/media', data, config);
		console.log(res.data);
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

export const clearSuccessMedia = () => (dispatch) => {
	dispatch({
		type: CLEAR_SUCCESS,
	});
};

const setLoading = (dispatch) => {
	dispatch({
		type: MEDIA_LOADING,
	});
};
