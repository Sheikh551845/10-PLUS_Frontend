import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SlideCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div
            className=" bg-transparent h-[43vh] w-full  shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate(`/Product_details/${product?._id}`)}
        >
            {/* Image Container */}
            <div className="h-[25vh] relative">

                <div className="absolute top-3 right-3 flex gap-2 z-5">
                    {product?.New_arrival === "true" && (
                        <div className="bg-red-200 text-red-800 bg-opacity-30 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-sm shadow-sm ">
                            <span className=" text-[10px] md:text-xs">New</span>
                        </div>
                    )}
                    {product?.Offer === "true" && (
                        <div className="bg-green-200 text-green-800 bg-opacity-30 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
                            <span className=" text-[10px] md:text-xs">
                                -{product?.details?.Offer_percentage}
                            </span>
                        </div>
                    )}
                    {product?.combo === "true" && (
                        <div className="bg-yellow-200 text-yellow-800 bg-opacity-30 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-sm shadow-sm  ">
                            <span className=" text-[10px] md:text-xs">COMBO</span>
                        </div>
                    )}
                </div>


                <img
                    src={`${product?.Show_photo}`}
                    alt={`${product?.Name} photo`}
                    className="object-fill h-[25vh] w-full"
                />
            </div>

            {/* Content */}
            <div className="card-body flex flex-col justify-between pt-5 border-1  h-[41%]">
                <div className="text-center rounded-lg text-sm md:text-base mt-2 border-t-1 border-b-1 border-[rgba(185,28,28,0.7)] ">
                    <p className="pb-2 truncate whitespace-nowrap overflow-hidden text-ellipsis text-base font-semibold">
                        {`${product?.Name}`}
                    </p>
                    <p>
                        {product?.Offer === "true" ? (
                            <>
                                <span className="line-through">
                                    {product?.Price}
                                    <span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                                        ৳
                                    </span>
                                </span>{" "}
                                <span className="ml-2 text-green-400 text-lg md:text-xl">
                                    {product?.details?.Offer_price}
                                    <span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                                        ৳
                                    </span>
                                </span>
                            </>
                        ) : (
                            <span className="font-bold">
                                {product?.Price}
                                <span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                                    ৳
                                </span>
                            </span>
                        )}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default SlideCard;
