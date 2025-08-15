import React from 'react';
import { useLoaderData } from 'react-router-dom';
import AllProducts from '../Allproducts.jsx/AllProducts';
import { Helmet } from 'react-helmet-async';
import Section_Title from '../../Components/Section_Title';

const T_shirt_user = () => {

    const data = useLoaderData()

    return (
        <div>
            <Helmet>
                <title>10 PLUS|T-Shirt</title>
            </Helmet>
            <AllProducts data={data}></AllProducts>
        </div>
    );
};

export default T_shirt_user;