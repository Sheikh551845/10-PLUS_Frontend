import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import Section_Title from '../../../Components/Section_Title';
import AllProducts from '../../Allproducts.jsx/AllProducts';
import { FadeLoader } from 'react-spinners';
import { AuthContext } from '../../../AuthPorvider';

const Polo = () => {
  const loaderData = useLoaderData();
  const { loading } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  // Set loader data and control spinner
  useEffect(() => {
    if (loaderData) {
      setData(loaderData);
      setIsFetching(false);
    } else {
      // Server down or safeFetch returned null
      setData([]);
      setIsFetching(false);
    }
  }, [loaderData]);

  return (
    <div>
      <Helmet>
        <title>10 PLUS | POLO</title>
      </Helmet>

      {(loading || isFetching) ? (
        <div className="flex justify-center items-center h-[80vh]">
          <FadeLoader color="rgba(185,28,28,0.7)" size={15} />
        </div>
      ) : data?.length === 0 ? (
        <div className="flex justify-center items-center h-[80vh]">
          <p className="text-xl font-bold text-red-500">
            The Product Will Available Soon!
          </p>
        </div>
      ) : (
        <AllProducts data={data} />
      )}
    </div>
  );
};
    

export default Polo;