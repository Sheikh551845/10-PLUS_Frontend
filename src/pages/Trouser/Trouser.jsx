import React from 'react';
import { useLoaderData } from 'react-router-dom';
import AllProducts from '../Allproducts.jsx/AllProducts';
import Section_Title from '../../Components/Section_Title';
import { Helmet } from 'react-helmet-async';

const Trouser = () => {
    const data = useLoaderData()

    return (
        <div>
            <Helmet>
                <title>10 PLUS|Trouser</title>
            </Helmet>

            <AllProducts data={data}></AllProducts>
        </div>
    );
};

export default Trouser;