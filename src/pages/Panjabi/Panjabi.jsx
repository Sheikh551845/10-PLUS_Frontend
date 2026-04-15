import React from 'react';
import { Helmet } from 'react-helmet-async';
import AllProducts from '../Allproducts.jsx/AllProducts';

const Panjabi = () => {
    return (
        <div>
            <Helmet>
                <title>10 PLUS | Panjabi</title>
            </Helmet>
            <AllProducts apiPath="/Category/Panjabi" />
        </div>
    );
};

export default Panjabi;