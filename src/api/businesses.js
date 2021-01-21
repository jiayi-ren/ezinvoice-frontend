import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

const getBusinesses = () => {
    return axiosWithAuth().get('/businesses');
};

const createBusiness = business => {
    return axiosWithAuth().post('/businesses', business);
};

const updateBusinessById = business => {
    return axiosWithAuth().put(`/businesses/${business.id}`, business);
};

const deleteBusiness = ids => {
    let requests = [];
    for (let i = 0; i < ids.length; i++) {
        requests.push(axiosWithAuth().delete(`/businesses/${ids[i]}`));
    }
    return axios.all(requests);
};

export { getBusinesses, createBusiness, updateBusinessById, deleteBusiness };
