import axios from 'axios';
import React from 'react';


export const axiosSecure=axios.create({
    baseURL: 'https://one0-plus-server.onrender.com'
})
const UseAxiosSecure = () => {
    return axiosSecure;
};

export default UseAxiosSecure;