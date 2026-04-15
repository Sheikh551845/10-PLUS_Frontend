import React from 'react';
import { Helmet } from 'react-helmet-async';
import AllProducts from '../../Allproducts.jsx/AllProducts';

const Polo = () => {
    return (
        <div>
            <Helmet>
                <title>10 PLUS | POLO</title>
            </Helmet>
            <AllProducts apiPath="/Category/Polo" />
        </div>
    );
};

export default Polo;