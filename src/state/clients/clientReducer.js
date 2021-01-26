import {
    GET_CLIENTS_REQUEST,
    GET_CLIENTS_SUCCESS,
    GET_CLIENTS_FAILURE,
    CREATE_CLIENT_REQUEST,
    CREATE_CLIENT_SUCCESS,
    CREATE_CLIENT_FAILURE,
    UPDATE_CLIENT_REQUEST,
    UPDATE_CLIENT_SUCCESS,
    UPDATE_CLIENT_FAILURE,
    DELETE_CLIENT_REQUEST,
    DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_FAILURE,
} from './clientActions';
import { arrToObj } from '../../utils/arrToObj';

const initState = {
    clients: {},
    status: 'idle',
    message: '',
};

export const clientReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_CLIENTS_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case GET_CLIENTS_SUCCESS:
            return {
                ...state,
                clients: arrToObj(action.payload, 'id'),
                status: 'succeeded',
            };
        case GET_CLIENTS_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        case CREATE_CLIENT_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case CREATE_CLIENT_SUCCESS:
            let { id, ...newClient } = action.payload;
            return {
                ...state,
                clients: { ...state.clients, [action.payload.id]: newClient },
                status: 'succeeded',
            };
        case CREATE_CLIENT_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        case UPDATE_CLIENT_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case UPDATE_CLIENT_SUCCESS:
            return {
                ...state,
                clients: {
                    ...state.clients,
                    [action.payload.id]: action.payload,
                },
                status: 'succeeded',
            };
        case UPDATE_CLIENT_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        case DELETE_CLIENT_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case DELETE_CLIENT_SUCCESS:
            let clientsList =
                action.payload.length > 0 ? arrToObj(action.payload, 'id') : {};
            return {
                ...state,
                clients: clientsList,
                status: 'succeeded',
            };
        case DELETE_CLIENT_FAILURE:
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
