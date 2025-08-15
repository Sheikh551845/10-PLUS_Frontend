import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SlideCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div
            className="card bg-base-100 w-full h-[95%] shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate(`/Product_details/${product?._id}`)}
        >
            {/* Image Container */}
            <div className="relative h-1/2 w-full">
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                    {product?.New_arrival === "true" && (
                        <div className="bg-[rgba(185,28,28,0.7)] text-white rounded-tl-sm rounded-br-sm text-sm px-2 shadow-lg">
                            New<span className="animate-fire text-base">✨</span>
                        </div>
                    )}
                    {product?.Offer === "true" && (
                        <div className="bg-[rgba(6,240,6,0.7)] text-white rounded-tl-sm rounded-br-sm px-2 shadow-lg">
                            -{product?.details?.Offer_percentage}
                        </div>
                    )}
                    {product?.combo === "true" && (
                        <div className="bg-[rgb(245,220,0)] text-white rounded-tl-sm rounded-br-sm px-2 shadow-lg">
                            COMBO
                        </div>
                    )}
                </div>

                <img
                    src={product?.Show_photo}
                    alt={product?.Name}
                    className="object-cover w-full h-full rounded-t-lg"
                />
            </div>

            {/* Content */}
            <div className="card-body p-3 h-1/2 w-full">
                <h2 className="card-title text-sm">{product?.Category}</h2>
                <div className="flex-grow text-left text-xs md:text-sm">
                    <p><span className="font-bold">Name: </span>{product?.Name}</p>
                    <p><span className="font-bold">Category: </span>{product?.Category}</p>
                    <p>
                        <span className="font-bold">Price: </span>
                        {product?.Offer === "true" ? (
                            <>
                                <span className="line-through">{product?.Price}<span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>৳</span></span>{" "}
                                <span className="ml-2 text-green-400 text-lg md:text-xl">
                                    {product?.details?.Offer_price}<span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>৳</span>
                                </span>
                            </>
                        ) : (
                            <span>{product?.Price}<span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>৳</span></span>
                        )}
                    </p>
                </div>


            </div>
        </div>
    );
};

export default SlideCard;
