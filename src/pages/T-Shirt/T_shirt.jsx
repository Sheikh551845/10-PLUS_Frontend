import React from 'react';
import { useLoaderData } from 'react-router-dom';
import AllProducts from '../Allproducts.jsx/AllProducts';

const T_shirt_user = () => {

    const data=useLoaderData()

    return (
        <div>
           <AllProducts data={data}></AllProducts>
        </div>
    );
};

export default T_shirt_user;