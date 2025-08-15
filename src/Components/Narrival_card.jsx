
import { Link, useNavigate } from 'react-router-dom';


const Narrival_card = ({ product }) => {
    const navigate = useNavigate()


    return (

        <div className="card bg-base-100 w-full max-w-[320px] shadow-md transform hover:scale-105 transition-transform duration-300" onClick={() => navigate(`/Product_details/${product?._id}`)}>


            <div className="h-50 relative ">
                {product?.New_arrival == "true" ? <div className=" absolute top-3 right-3  bg-[rgba(185,28,28,0.7)]   text-white bg-opacity-30 backdrop-blur-sm rounded-tl-sm rounded-br-sm text-sm px-2 shadow-lg border-red-700 border-rb-2 z-3">New<span className="animate-fire text-base">✨</span></div> : <></>}
                {product?.Offer == "true" ? <div className=" absolute top-53 right-40 bg-[rgba(6,240,6,0.7)]   text-white bg-opacity-30 backdrop-blur-sm rounded-tl-sm rounded-br-sm px-2 shadow-lg border-green-300 border-rb-2 z-3"><span className="animate-fire text-sm ">-{product?.details?.Offer_percentage}</span></div> : <></>}
                {product?.combo == "true" ? <div className=" absolute top-53 right-20 bg-[rgb(245,220,0)]   text-white bg-opacity-30 backdrop-blur-sm rounded-tl-sm rounded-br-sm px-2 shadow-lg border-yellow-300 border-rb-2 z-3"><span className="animate-fire text-sm">COMBO</span></div> : <></>}
                <img
                    src={`${product?.Show_photo}`}
                    alt={`${product?.Name} photo`}
                    className="object-fill h-50  w-full"
                />
            </div>

            <div className="card-body p-3">
                <h2 className="card-title text-sm">
                    {product?.Category}

                </h2>
                <div className="flex-grow  text-left">
                    <p className=''>
                        <span className="font-bold ">Name: </span>{`${product?.Name}`}
                    </p>
                    <p className=''>
                        <span className="font-bold">Category: </span>{`${product?.Category}`}
                    </p>
                    <p>
                        <span className="font-bold">Price: </span>
                        {product?.Offer === "true" ? (
                            <>
                                <span className="line-through">{product?.Price}৳</span>{" "}
                                <span className="ml-2 text-green-400 text-lg md:text-2xl">
                                    {product?.details?.Offer_price}৳
                                </span>
                            </>
                        ) : (
                            <span>{product?.Price}৳</span>
                        )}
                    </p>

                </div>

                <div className="card-actions justify-end mt-2">
                    <Link
                        to={`/Product_details/${product?._id}`}

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