import React, { useEffect, useState, useRef } from 'react';
import Section_Title from '../../Components/Section_Title';
import Narrival_card from '../../Components/Narrival_card';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import CardSweper from '../../Components/CardSweper';
import CardSweperR from '../../Components/CardSweperR';

const Offers = () => {
      const axiosSecure = UseAxiosSecure()



    const { data: Offers = [] } = useQuery({
        queryKey: ['Offers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/OfferProduct');
            return res.data.slice(0, 10);
        }
    })


    //    const Offers=data.filter(value=> value.Offers=true)

    return (

        <div className='w-[94%] mx-auto  min-h-fit'>
            {Offers.length > 0 ? <div><Section_Title Title={"Offers"} />
            <CardSweperR products={Offers}></CardSweperR>
            </div> : <></>}
        

        </div>
    );
};

export default Offers;