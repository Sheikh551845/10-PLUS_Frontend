import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import AllProducts from '../Allproducts.jsx/AllProducts';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../AuthPorvider';
import { FadeLoader } from 'react-spinners';

const Jersey = () => {
    const loaderData = useLoaderData();
    const { loading } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (loaderData) {
            setData(loaderData);
            setIsFetching(false);
        } else {
            setData([]);
            setIsFetching(false);
        }
    }, [loaderData]);

    return (
        <div>
            <Helmet>
                <title>10 PLUS | Jersey</title>
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

export default Jersey;
