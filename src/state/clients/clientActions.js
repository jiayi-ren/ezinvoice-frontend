import {
    getClients,
    createClient,
    updateClientById,
    deleteClients,
} from '../../api/clients';
import { convertKeysCase } from '../../utils/caseConversion';

export const GET_CLIENTS_REQUEST = 'GET_CLIENTS_REQUEST';
export const GET_CLIENTS_SUCCESS = 'GET_CLIENTS_SUCCESS';
export const GET_CLIENTS_FAILURE = 'GET_CLIENTS_FAILURE';

export const getClientsAct = () => {
    return async dispatch => {
        dispatch({ type: GET_CLIENTS_REQUEST });

        try {
            const res = await getClients();
            dispatch({
                type: GET_CLIENTS_SUCCESS,
                payload: convertKeysCase(res.data, 'camel'),
            });
        } catch (err) {
            if (typeof err.response !== 'undefined') {
                const errMessage =
                    err && err.response.data.message
                        ? err.response.data.message
                        : err.response.statusText;
                dispatch({ type: GET_CLIENTS_FAILURE, payload: errMessage });
            } else {
                dispatch({ type: GET_CLIENTS_FAILURE, payload: err.message });
            }
        }
    };
};

export const CREATE_CLIENT_REQUEST = 'CREATE_CLIENT_REQUEST';
export const CREATE_CLIENT_SUCCESS = 'CREATE_CLIENT_SUCCESS';
export const CREATE_CLIENT_FAILURE = 'CREATE_CLIENT_FAILURE';

export const createClientAct = client => {
    return async dispatch => {
        dispatch({ type: CREATE_CLIENT_REQUEST });

        try {
            const res = await createClient(convertKeysCase(client, 'snake'));
            dispatch({
                type: CREATE_CLIENT_SUCCESS,
                payload: convertKeysCase(res.data.client, 'camel'),
            });
        } catch (err) {
            if (typeof err.response !== 'undefined') {
                const errMessage =
                    err && err.response.data.message
                        ? err.response.data.message
                        : err.response.statusText;
                dispatch({ type: CREATE_CLIENT_FAILURE, payload: errMessage });
            } else {
                dispatch({ type: CREATE_CLIENT_FAILURE, payload: err.message });
            }
        }
    };
};

export const UPDATE_CLIENT_REQUEST = 'UPDATE_CLIENT_REQUEST';
export const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';
export const UPDATE_CLIENT_FAILURE = 'UPDATE_CLIENT_FAILURE';

export const updateClientByIdAct = client => {
    return async dispatch => {
        dispatch({ type: UPDATE_CLIENT_REQUEST });

        try {
            const res = await updateClientById(client);
            dispatch({
                type: UPDATE_CLIENT_SUCCESS,
                payload: convertKeysCase(res.data.client, 'camel'),
            });
        } catch (err) {
            if (typeof err.response !== 'undefined') {
                const errMessage =
                    err && err.response.data.message
                        ? err.response.data.message
                        : err.response.statusText;
                dispatch({ type: UPDATE_CLIENT_FAILURE, payload: errMessage });
            } else {
                dispatch({ type: UPDATE_CLIENT_FAILURE, payload: err.message });
            }
        }
    };
};

export const DELETE_CLIENT_REQUEST = 'DELETE_CLIENT_REQUEST';
export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS';
export const DELETE_CLIENT_FAILURE = 'DELETE_CLIENT_FAILURE';

export const deleteClientsAct = ids => {
    return async dispatch => {
        dispatch({ type: DELETE_CLIENT_REQUEST });

        try {
            await deleteClients(ids);
            const res = await getClients();
            dispatch({
                type: DELETE_CLIENT_SUCCESS,
                payload: convertKeysCase(res.data, 'camel'),
            });
        } catch (err) {
            if (typeof err.response !== 'undefined') {
                const errMessage =
                    err && err.response.data.message
                        ? err.response.data.message
                        : err.response.statusText;
                dispatch({ type: DELETE_CLIENT_FAILURE, payload: errMessage });
            } else {
                dispatch({ type: DELETE_CLIENT_FAILURE, payload: err.message });
            }
        }
    };
};
