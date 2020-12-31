import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

const getEstimates = () => {
    return axiosWithAuth().get('/estimates');
};

const createEstimate = estimate => {
    return axiosWithAuth().post('/estimates', estimate);
};

const updateEstimateById = estimate => {
    return axiosWithAuth().put(`/estimates/${estimate.id}`, estimate);
};

const deleteEstimates = ids => {
    let requests = [];
    for (let i = 0; i < ids.length; i++) {
        requests.push(axiosWithAuth().delete(`/estimates/${ids[i]}`));
    }
    return axios.all(requests);
};

export { getEstimates, createEstimate, updateEstimateById, deleteEstimates };
