import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import { userReducer as user } from './user/userReducer';
import { clientReducer as clients } from './clients/clientReducer';
import { businessReducer as businesses } from './businesses/businessReducer';
import { itemReducer as items } from './items/itemReducer';
import { invoiceReducer as invoices } from './invoices/invoiceReducer';

const rootReducer = combineReducers({
    user,
    clients,
    businesses,
    items,
    invoices,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
