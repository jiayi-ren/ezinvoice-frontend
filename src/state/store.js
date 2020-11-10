import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { userReducer as user } from './user/userReducer';
import { clientReducer as clients } from './clients/clientReducer';
import { itemReducer as items } from './items/itemReducer';

const rootReducer = combineReducers({
    user,
    clients,
    items,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
