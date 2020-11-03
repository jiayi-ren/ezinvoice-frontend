import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { userReducer as user } from './user/userReducer';

const rootReducer = combineReducers({
    user,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
