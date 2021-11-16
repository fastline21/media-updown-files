import { SAVE_MEDIA, MEDIA_ERROR, MEDIA_LOADING } from 'actions/types';

const initialState = {
	media: null,
	loading: false,
	error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	switch (action.type) {
		case SAVE_MEDIA:
			return {
				...state,
				media: action.payload,
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
		default:
			return state;
	}
};
