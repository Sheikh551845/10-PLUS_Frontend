import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import NewOfferCombo from '../../../Components/Dash Componets/NewOfferCombo';
import { AuthContext } from '../../../AuthPorvider';
import { FadeLoader } from 'react-spinners';


const Edit_combo = () => {
    const NewProducts = useLoaderData()


    const { loading } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    // Set loader data and control spinner
    useEffect(() => {
        if (NewProducts) {
            setData(NewProducts);
            setIsFetching(false);
        } else {
            // Server down or safeFetch returned null
            setData([]);
            setIsFetching(false);
        }
    }, [NewProducts]);

      if (loading || isFetching)
        return (
                      <div className="flex justify-center items-center h-[80vh] w-[80vw]">
                        <FadeLoader color="rgba(185,28,28,0.7)" size={15} />
                      </div>
        );

    return (
        <div>
            <NewOfferCombo products={NewProducts}></NewOfferCombo>
        </div>
    );
};

export default Edit_combo;