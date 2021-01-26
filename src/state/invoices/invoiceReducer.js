import {
    GET_INVOICES_REQUEST,
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAILURE,
    CREATE_INVOICE_REQUEST,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_FAILURE,
    UPDATE_INVOICE_REQUEST,
    UPDATE_INVOICE_SUCCESS,
    UPDATE_INVOICE_FAILURE,
    DELETE_INVOICE_REQUEST,
    DELETE_INVOICE_SUCCESS,
    DELETE_INVOICE_FAILURE,
} from './invoiceActions';
import { arrToObj } from '../../utils/arrToObj';

const initState = {
    invoices: {},
    status: 'idle',
    message: '',
};

export const invoiceReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_INVOICES_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case GET_INVOICES_SUCCESS:
            return {
                ...state,
                invoices: arrToObj(action.payload, 'id'),
                status: 'succeeded',
            };
        case GET_INVOICES_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        case CREATE_INVOICE_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case CREATE_INVOICE_SUCCESS:
            let { id, ...newInvoice } = action.payload;
            return {
                ...state,
                invoices: { ...state.invoices, id: newInvoice },
                status: 'succeeded',
            };
        case CREATE_INVOICE_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        case UPDATE_INVOICE_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case UPDATE_INVOICE_SUCCESS:
            return {
                ...state,
                invoices: {
                    ...state.invoices,
                    [action.payload.id]: action.payload,
                },
                status: 'succeeded',
            };
        case UPDATE_INVOICE_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        case DELETE_INVOICE_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case DELETE_INVOICE_SUCCESS:
            let invoicesList =
                action.payload.length > 0 ? arrToObj(action.payload, 'id') : {};
            return {
                ...state,
                invoices: invoicesList,
                status: 'succeeded',
            };
        case DELETE_INVOICE_FAILURE:
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
