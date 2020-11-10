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

const initState = {
    items: [],
    status: 'idle',
    error: '',
};

export const itemReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                status: 'succeeded',
            };
        case GET_ITEMS_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case CREATE_ITEM_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case CREATE_ITEM_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload],
                status: 'succeeded',
            };
        case CREATE_ITEM_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case UPDATE_ITEM_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload],
                status: 'succeeded',
            };
        case UPDATE_ITEM_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case DELETE_ITEM_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                items: action.payload,
                status: 'succeeded',
            };
        case DELETE_ITEM_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        default:
            return {
                ...state,
                status: 'idle',
                error: '',
            };
    }
};
