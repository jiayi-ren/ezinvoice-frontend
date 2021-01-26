import {
    getItems,
    createItem,
    updateItemById,
    deleteItemById,
} from '../../api/items';
import { convertKeysCase } from '../../utils/caseConversion';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILURE = 'GET_ITEMS_FAILURE';

export const getItemsAct = () => {
    return async dispatch => {
        dispatch({ type: GET_ITEMS_REQUEST });

        try {
            const res = await getItems();
            dispatch({
                type: GET_ITEMS_SUCCESS,
                payload: convertKeysCase(res.data, 'camel'),
            });
        } catch (err) {
            const errMessage = err.response.data.message
                ? err.response.data.message
                : err.response.statusText;
            dispatch({ type: GET_ITEMS_FAILURE, payload: errMessage });
        }
    };
};

export const CREATE_ITEM_REQUEST = 'CREATE_ITEM_REQUEST';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE';

export const createItemAct = item => {
    return async dispatch => {
        dispatch({ type: CREATE_ITEM_REQUEST });
        try {
            const res = await createItem(item);
            dispatch({
                type: CREATE_ITEM_SUCCESS,
                payload: convertKeysCase(res.data.item, 'camel'),
            });
        } catch (err) {
            const errMessage = err.response.data.message
                ? err.response.data.message
                : err.response.statusText;
            dispatch({ type: CREATE_ITEM_FAILURE, payload: errMessage });
        }
    };
};

export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';

export const updateItemByIdAct = item => {
    return async dispatch => {
        dispatch({ type: UPDATE_ITEM_REQUEST });

        try {
            const res = await updateItemById(item);
            dispatch({
                type: UPDATE_ITEM_SUCCESS,
                payload: convertKeysCase(res.data.item, 'camel'),
            });
        } catch (err) {
            const errMessage = err.response.data.message
                ? err.response.data.message
                : err.response.statusText;
            dispatch({ type: UPDATE_ITEM_FAILURE, payload: errMessage });
        }
    };
};

export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

export const deleteItemByIdAct = id => {
    return async dispatch => {
        dispatch({ type: DELETE_ITEM_REQUEST });

        try {
            await deleteItemById(id);
            const res = await getItems();
            dispatch({
                type: DELETE_ITEM_SUCCESS,
                payload: convertKeysCase(res.data.item, 'camel'),
            });
        } catch (err) {
            const errMessage = err.response.data.message
                ? err.response.data.message
                : err.response.statusText;
            dispatch({ type: DELETE_ITEM_FAILURE, payload: errMessage });
        }
    };
};
