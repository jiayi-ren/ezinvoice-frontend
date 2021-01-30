import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    CREATE_ITEM_REQUEST,
    CREATE_ITEM_SUCCESS,
    CREATE_ITEM_FAILURE,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAILURE,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE,
} from './itemActions';
import { arrToObj } from '../../utils/arrToObj';

const initState = {
    items: {},
    status: 'idle',
    message: '',
};

export const itemReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                items: arrToObj(action.payload, 'id'),
                status: 'succeeded',
            };
        case GET_ITEMS_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        case CREATE_ITEM_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case CREATE_ITEM_SUCCESS:
            let { id, ...newItem } = action.payload;
            return {
                ...state,
                items: { ...state.items, id: newItem },
                status: 'succeeded',
            };
        case CREATE_ITEM_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        case UPDATE_ITEM_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                items: { ...state.items, [action.payload.id]: action.payload },
                status: 'succeeded',
            };
        case UPDATE_ITEM_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        case DELETE_ITEM_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case DELETE_ITEM_SUCCESS:
            let itemsList =
                action.payload.length > 0 ? arrToObj(action.payload, 'id') : {};
            return {
                ...state,
                items: itemsList,
                status: 'succeeded',
            };
        case DELETE_ITEM_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        default:
            return {
                ...state,
                status: 'idle',
                message: '',
            };
    }
};
