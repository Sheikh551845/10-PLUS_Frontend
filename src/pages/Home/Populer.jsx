import React from 'react';
import Section_Title from '../../Components/Section_Title';

const Populer = () => {
    return (
        <div  className='w-[95%] md:w-[80%] mx-auto min-h-fit'>
            <Section_Title Title={"Populer Prodcts"}></Section_Title>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-fit mx-auto '>
                <div className='w-42 md:w-46 h-18 md:h-28 bg-amber-100 text-center hover:cursor-pointer z-4 card shadow-md transform hover:scale-105 transition-transform duration-300'>
                   Demo
                </div>

               <div  className='w-42 md:w-46 h-18 md:h-28 bg-amber-100 text-center hover:cursor-pointer z-4 card shadow-md transform hover:scale-105 transition-transform duration-300'>
                   Demo
               </div>

               <div  className='w-42 md:w-46 h-18 md:h-28 bg-amber-100 text-center hover:cursor-pointer z-4 card shadow-md transform hover:scale-105 transition-transform duration-300'>
                   Demo
               </div>

               <div  className='w-42 md:w-46 h-18 md:h-28 bg-amber-100 text-center hover:cursor-pointer z-4 card shadow-md transform hover:scale-105 transition-transform duration-300'>
                   Demo
               </div>

               <div  className='w-42 md:w-46 h-18 md:h-28 bg-amber-100 text-center hover:cursor-pointer z-4 card shadow-md transform hover:scale-105 transition-transform duration-300'>
                   Demo
               </div>

               <div  className='w-42 md:w-46 h-18 md:h-28 bg-amber-100 text-center hover:cursor-pointer z-4 card shadow-md transform hover:scale-105 transition-transform duration-300'>
                   Demo
               </div>
            </div>
        </div>
    );
};

export default Populer;