import { combineReducers } from 'redux';
import mediaReducer from './mediaReducer';
import outputReducer from './outputReducer';

export default combineReducers({
	mediaState: mediaReducer,
	outputState: outputReducer,
});
