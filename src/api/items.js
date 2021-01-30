import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

const getItems = () => {
    return axiosWithAuth().get('/items');
};

const createItem = item => {
    return axiosWithAuth().post('/items', item);
};

const updateItemById = item => {
    return axiosWithAuth().put(`/items/${item.id}`, item);
};

const deleteItems = ids => {
    let requests = [];
    for (let i = 0; i < ids.length; i++) {
        requests.push(axiosWithAuth().delete(`/items/${ids[i]}`));
    }
    return axios.all(requests);
};

export { getItems, createItem, updateItemById, deleteItems };
