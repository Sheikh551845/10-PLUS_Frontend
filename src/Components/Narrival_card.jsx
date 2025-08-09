import React from 'react';
import { Link } from 'react-router-dom';
import { TbListDetails } from 'react-icons/tb';

const Narrival_card = (number) => {

    const key = number.number

    return (

        <div className="card bg-base-100 w-64 shadow-md transform hover:scale-105 transition-transform duration-300">


            <figure className="h-32 relative">
                <div className="text-xl absolute top-0 right-0 bg-[rgba(185,28,28,0.7)]   text-white bg-opacity-30 backdrop-blur-sm rounded-sm">New Arrival<span className="animate-fire text-xl">✨</span></div>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="object-cover h-full w-full"
                />
            </figure>

            <div className="card-body p-3">
                <h2 className="card-title text-sm">
                    Card Title

                </h2>
                <p className="text-xs">
                    A card component has a figure, a body part, and inside body there are title and actions parts
                </p>
                <div className="card-actions justify-end mt-2">
                    <Link
                        to={`/Product_details/${key}`}

                        className="bg-[rgba(185,28,28,0.7)] rounded-xl w-30 h-8 text-white flex items-center justify-center cursor-pointer"
                    >
                        Details
                        
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default Narrival_card;