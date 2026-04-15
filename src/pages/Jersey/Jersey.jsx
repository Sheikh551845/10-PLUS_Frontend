import React from 'react';
import { Helmet } from 'react-helmet-async';
import AllProducts from '../Allproducts.jsx/AllProducts';

const Jersey = () => {
    return (
        <div>
            <Helmet>
                <title>10 PLUS | Jersey</title>
            </Helmet>
            <AllProducts apiPath="/Category/Jersey" />
        </div>
    );
};

export default Jersey;
