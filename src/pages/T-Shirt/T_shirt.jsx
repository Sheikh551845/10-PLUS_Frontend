import React from 'react';
import { Helmet } from 'react-helmet-async';
import AllProducts from '../Allproducts.jsx/AllProducts';

const T_shirt_user = () => {
  return (
    <div>
      <Helmet>
        <title>10 PLUS | T-shirt</title>
      </Helmet>
      <AllProducts apiPath="/Category/T-Shirt" />
    </div>
  );
};

export default T_shirt_user;