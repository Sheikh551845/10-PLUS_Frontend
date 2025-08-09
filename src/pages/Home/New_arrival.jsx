import React from 'react';
import Section_Title from '../../Components/Section_Title';
import Narrival_card from '../../Components/Narrival_card';

const New_arrival = () => {
    const test = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className='w-[90%] md:w-[80%] mx-auto pt-10 pb-20 min-h-screen'>
            <Section_Title Title={"New Arrival"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
                {test.map((value) => (
                    <Narrival_card key={value} number={value} />
                ))}
            </div>

        </div>
    );
};

export default New_arrival;