import React from 'react';
import { Helmet } from 'react-helmet-async';
import AllProducts from '../Allproducts.jsx/AllProducts';

const Cuban_shirt = () => {
    return (
        <div>
            <Helmet>
                <title>10 PLUS | Cuban Shirt</title>
            </Helmet>
            <AllProducts apiPath="/Category/Shirt" />
        </div>
    );
};

export default Cuban_shirt;