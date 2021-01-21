import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

const getClients = () => {
    return axiosWithAuth().get('/clients');
};

const createClient = client => {
    return axiosWithAuth().post('/clients', client);
};

const updateClientById = client => {
    return axiosWithAuth().put(`/clients/${client.id}`, client);
};

const deleteClients = ids => {
    let requests = [];
    for (let i = 0; i < ids.length; i++) {
        requests.push(axiosWithAuth().delete(`/clients/${ids[i]}`));
    }
    return axios.all(requests);
};

export { getClients, createClient, updateClientById, deleteClients };
