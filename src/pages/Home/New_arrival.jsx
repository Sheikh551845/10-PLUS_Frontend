import React, { useEffect, useState, useRef } from 'react';
import Section_Title from '../../Components/Section_Title';
import Narrival_card from '../../Components/Narrival_card';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import CardSweper from '../../Components/CardSweper';


const New_arrival = () => {

    const axiosSecure = UseAxiosSecure()



    const { data: New_arrivals = [] } = useQuery({
        queryKey: ['New_arrivals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/NewArrival');
            return res.data.slice(0, 10);
        }
    })


    //    const new_arrivals=data.filter(value=> value.New_arrivals=true)

    return (

        <div className='w-[94%] mx-auto  min-h-fit'>
            {New_arrivals.length > 0 ? <div><Section_Title Title={"New Arrival"} />
            <CardSweper key={New_arrivals[0]._id} products={New_arrivals}></CardSweper>
            </div> : <></>}
        

        </div>
    );
};

export default New_arrival;