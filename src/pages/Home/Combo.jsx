import React, { useEffect, useState, useRef } from 'react';
import Section_Title from '../../Components/Section_Title';
import Narrival_card from '../../Components/Narrival_card';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import CardSweper from '../../Components/CardSweper';
const Combo = () => {
     const axiosSecure = UseAxiosSecure()



    const { data: ComboProducts = [] } = useQuery({
        queryKey: ['ComboProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/Combo');
            return res.data.slice(0, 10);
        }
    })


    //    const ComboProducts=data.filter(value=> value.ComboProducts=true)

    return (

        <div className='w-[95%] mx-auto  min-h-fit'>
            {ComboProducts.length > 0 ? <div><Section_Title Title={"Combo"} />
            <CardSweper products={ComboProducts}></CardSweper>
            </div> : <></>}
        

        </div>
    );
};
export default Combo;