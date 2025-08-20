import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Narrival_card = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div
            className=" bg-transparent bg-opacity-60  w-full max-w-[320px] shadow-md transform hover:scale-102 transition-transform duration-300 overflow-hidden"
            onClick={() => navigate(`/Product_details/${product?._id}`)}
        >
            {/* Image & Badges */}
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

            {/* Card Body */}
            <div className="card-body border-1 p-3 flex flex-col justify-between ">
                {/* Product Info */}
                <div
                    className="text-center text-sm md:text-base border-t border-b border-dashed w-full
             border-[rgba(185,28,28,0.7)] py-3 z-2 rounded-md 
             bg-transparent backdrop-blur-sm"
                >
                    {/* Product Name */}
                    <p className="pb-2 truncate font-medium">
                        {product?.Name}
                    </p>

                    {/* Product Price */}
                    <p>
                        {product?.Offer === "true" ? (
                            <>
                                <span className="line-through  text-sm">
                                    {product?.Price}
                                    <span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>৳</span>
                                </span>
                                <span className="ml-2 font-semibold text-green-500 text-lg md:text-xl">
                                    {product?.details?.Offer_price}
                                    <span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>৳</span>
                                </span>
                            </>
                        ) : (
                            <span className="font-bold  text-lg md:text-xl">
                                {product?.Price}
                                <span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>৳</span>
                            </span>
                        )}
                    </p>
                </div>


                {/* Hover Cart Button */}
                <div className="flex justify-center relative group">
                    <Link
                        to={`/Product_details/${product?._id}`}
                        className="bg-[rgba(185,28,28,0.7)] rounded-sm w-20 md:w-26 h-6 md:h-8 text-white flex items-center justify-center cursor-pointer text-xs md:text-base relative overflow-hidden"
                    >
                        {/* Cart Icon - centered on hover/focus */}
                        <FaCartShopping className="absolute inset-0 m-auto w-5 h-5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300" />

                        {/* Details text - hide on hover/focus */}
                        <span className="transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0">
                            Details
                        </span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Narrival_card;
