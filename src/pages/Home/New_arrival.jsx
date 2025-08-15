import React, { useEffect, useState } from 'react';
import Section_Title from '../../Components/Section_Title';
import Narrival_card from '../../Components/Narrival_card';
import axios from 'axios';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const New_arrival = () => {

    const axiosSecure=UseAxiosSecure()



    const { data: New_arrivals = [] } = useQuery({
        queryKey: ['New_arrivals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/NewArrival');
            return res.data.slice(0, 10);
        }
    })


    //    const new_arrivals=data.filter(value=> value.New_arrivals=true)

    return (
        <div className='w-[95%] md:w-[80%] mx-auto  min-h-fit'>
            {New_arrivals.length > 0 ? <div><Section_Title Title={"New Arrival"} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md;gap-6 place-items-center">
                    {New_arrivals.map((product) => (
                        <Narrival_card key={product.id} product={product} />
                    ))}
                </div></div> : <></>}


        </div>
    );
};

export default New_arrival;