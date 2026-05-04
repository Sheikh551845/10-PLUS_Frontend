import React from 'react';
import Section_Title from '../../Components/Section_Title';
import { useNavigate } from 'react-router-dom';
import { axiosSecure } from '../../Hooks/UseAxiosSecure';

const BASE_URL = axiosSecure.defaults.baseURL;


const Populer = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Panjabi', path: '/Panjabi', img: `${BASE_URL}/images/panjabi_logo.png` },
    { name: 'Trouser', path: '/Trouser', img: `${BASE_URL}/images/pant_logo.png` },
    { name: 'Shirt', path: '/Cuban-Shirt', img: `${BASE_URL}/images/shirt_logo.png` },
    { name: 'Polo', path: '/Polo', img: `${BASE_URL}/images/polo_logo.png` },
    { name: 'T Shirt', path: '/T-Shirt', img: `${BASE_URL}/images/t-shirt_logo.png` },
    { name: 'Combo', path: '/Combo', img: `${BASE_URL}/images/combo_logo.png` },
    { name: 'Jersey', path: '/Jersey', img: `${BASE_URL}/images/jursey.png` }
  ];

  return (
    <div className="w-[98%] mx-auto min-h-fit">
      <Section_Title Title="Populer Products" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 w-fit mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(cat.path)}
            style={{ backgroundImage: `url('https://i.ibb.co.com/bRJw1SPy/footer-bg.jpg')` }}
            className="flex flex-row justify-between items-center w-42 md:w-50 h-28 md:h-30 text-center hover:cursor-pointer z-4 card shadow-md transform hover:scale-105 transition-transform duration-300 bg-gray-50"
          >
            <div className="w-[40%] h-full">
              <img
                className="object-fill h-[85%] w-full mt-2"
                src={cat.img}
                alt={cat.name}
              />
            </div>
            <div className="w-[60%] text-xl font-bold text-red-800">
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Populer;
