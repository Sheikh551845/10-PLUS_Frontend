import React from 'react';
import { Helmet } from 'react-helmet-async';
import AllProducts from '../Allproducts.jsx/AllProducts';

const Trouser = () => {
  return (
    <div>
      <Helmet>
        <title>10 PLUS | Trouser</title>
      </Helmet>
      <AllProducts apiPath="/Category/Trouser" />
    </div>
  );
};

export default Trouser;