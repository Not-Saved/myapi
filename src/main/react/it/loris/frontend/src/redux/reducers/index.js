import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import gameReducer from "./gameReducer";
import userReducer from "./userReducer";

export default combineReducers({
    auth: authReducer,
    game: gameReducer,
    user: userReducer,
    form: formReducer,
});