import { axiosWithAuth } from '../utils/axiosWithAuth';

const getItems = () => {
    return axiosWithAuth().get('/items');
};

const createItem = item => {
    return axiosWithAuth().post('/items', item);
};

const updateItemById = item => {
    return axiosWithAuth().put(`/items/${item.id}`, item);
};

const deleteItemById = id => {
    return axiosWithAuth().delete(`/items/${id}`);
};

export { getItems, createItem, updateItemById, deleteItemById };
