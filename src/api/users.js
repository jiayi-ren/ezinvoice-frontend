import { axiosWithAuth } from '../utils/axiosWithAuth';

const getUserInfo = () => {
    return axiosWithAuth().get('/users');
};

const getUserSettings = () => {
    return axiosWithAuth().get('/settings');
};

const createUserSettings = settings => {
    return axiosWithAuth().post('/settings', settings);
};

const updateUserSettings = settings => {
    return axiosWithAuth().put('/settings', settings);
};

export { getUserInfo, getUserSettings, createUserSettings, updateUserSettings };
