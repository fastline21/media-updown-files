import {
	SAVE_MEDIA,
	MEDIA_ERROR,
	MEDIA_LOADING,
	CLEAR_SUCCESS,
} from 'actions/types';

const initialState = {
	media: [],
	success: null,
	loading: false,
	error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	switch (action.type) {
		case SAVE_MEDIA:
			return {
				...state,
				success: true,
				loading: false,
			};
		case MEDIA_LOADING:
			return {
				...state,
				loading: true,
			};
		case MEDIA_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case CLEAR_SUCCESS:
			return {
				...state,
				success: null,
			};
		default:
			return state;
	}
};
