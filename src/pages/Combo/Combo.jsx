import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import Section_Title from '../../Components/Section_Title';
import AllProducts from '../Allproducts.jsx/AllProducts';

const Combo = () => {
const data = useLoaderData()

    return (
        <div>
            <Helmet>
                <title>10 PLUS|Combo</title>
            </Helmet>

            <AllProducts data={data}></AllProducts>
        </div>
    );
};

export default Combo;