import React from 'react';
import { Helmet } from 'react-helmet-async';
import AllProducts from '../Allproducts.jsx/AllProducts';

const Combo = () => {
    return (
        <div>
            <Helmet>
                <title>10 PLUS | Combo</title>
            </Helmet>
            <AllProducts apiPath="/Combo" />
        </div>
    );
};

export default Combo;
