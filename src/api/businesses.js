import { axiosWithAuth } from '../utils/axiosWithAuth';

const getBusinesses = () => {
    return axiosWithAuth().get('/businesses');
};

const createBusiness = business => {
    return axiosWithAuth().post('/businesses', business);
};

const updateBusinessById = business => {
    return axiosWithAuth().put(`/businesses/${business.id}`, business);
};

const deleteBusinessById = id => {
    return axiosWithAuth().delete(`/businesses/${id}`);
};

export {
    getBusinesses,
    createBusiness,
    updateBusinessById,
    deleteBusinessById,
};
