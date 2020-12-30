import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

const getInvoices = () => {
    return axiosWithAuth().get('/invoices');
};

const createInvoice = invoice => {
    return axiosWithAuth().post('/invoices', invoice);
};

const updateInvoiceById = invoice => {
    return axiosWithAuth().put(`/invoices/${invoice.id}`, invoice);
};

const deleteInvoices = ids => {
    let requests = [];
    for (let i = 0; i < ids.length; i++) {
        requests.push(axiosWithAuth().delete(`/invoices/${ids[i]}`));
    }
    return axios.all(requests);
};

export { getInvoices, createInvoice, updateInvoiceById, deleteInvoices };
