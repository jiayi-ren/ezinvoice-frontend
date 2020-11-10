import axios from 'axios';

export const axiosWithAuth = () => {
    return axios.create({
        headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('___t')}`,
        },
        baseURL: process.env.REACT_APP_API_URI,
    });
};
