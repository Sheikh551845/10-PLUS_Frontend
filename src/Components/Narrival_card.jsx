
import { Link, useNavigate } from 'react-router-dom';


const Narrival_card = ({product}) => {
    const navigate=useNavigate()

    
    return (

        <div className="card bg-base-100 w-full max-w-[320px] shadow-md transform hover:scale-105 transition-transform duration-300" onClick={() => navigate(`/Product_details/${product._id}`)}>


            <div className="h-50 relative ">
                <div className="text-base absolute top-0 right-0 bg-[rgba(185,28,28,0.7)]   text-white bg-opacity-30 backdrop-blur-sm rounded-bl-sm">New Arrival<span className="animate-fire text-base">✨</span></div>
                <img
                    src={`${product.Show_photo}`}
                    alt={`${product.Name} photo`}
                   className="object-fill h-50  w-full"
                />
            </div>

            <div className="card-body p-3">
                <h2 className="card-title text-sm">
                    Card Title

                </h2>
                <div className="flex-grow  text-left">
                    <p>
                        <span className="font-bold ">Name: </span>{`${product.Name}`}
                    </p>
                    <p>
                        <span className="font-bold">Category: </span>{`${product.Category}`}
                    </p>
                    <p>
                        <span className="font-bold">Price: </span>{`${product.Price}`} <span style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>৳</span>
                    </p>
                </div>

                <div className="card-actions justify-end mt-2">
                    <Link
                        to={`/Product_details/${product._id}`}

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