import { axiosWithAuth } from './axiosWithAuth';

const getClients = () => {
    return axiosWithAuth().get('/clients');
};

const createClient = client => {
    return axiosWithAuth().post('/clients', client);
};

const updateClientById = client => {
    return axiosWithAuth().put(`/clients/${client.id}`, client);
};

const deleteClientById = id => {
    return axiosWithAuth().delete(`/clients/${id}`);
};

export { getClients, createClient, updateClientById, deleteClientById };
