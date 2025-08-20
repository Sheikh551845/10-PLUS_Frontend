import React from 'react';
import Section_Title from '../../Components/Section_Title';
import { useNavigate } from 'react-router-dom';
import combo from '../../assets/Demo images/Combo.png';
import Polo from '../../assets/Demo images/Polo.png';
import Tshirt from '../../assets/Demo images/T-shirt.png';
import Panjabi from '../../assets/Demo images/panjabi.png';
import Trouser from '../../assets/Demo images/Trouser.png';
import shirt from '../../assets/Demo images/shirt.png';
import bg from '../../assets/Background Img/footer bg.jpg';

const Populer = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Panjabi', path: '/Panjabi', img: Panjabi },
    { name: 'Trouser', path: '/Trouser', img: Trouser },
    { name: 'Shirt', path: '/Cuban-Shirt', img: shirt },
    { name: 'Polo', path: '/Polo', img: Polo },
    { name: 'T Shirt', path: '/T-Shirt', img: Tshirt },
    { name: 'Combo', path: '/Combo', img: combo }
  ];

  return (
    <div className="w-[95%] mx-auto min-h-fit">
      <Section_Title Title="Populer Products" />
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 w-fit mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(cat.path)}
            style={{ backgroundImage:`url('https://i.ibb.co.com/bRJw1SPy/footer-bg.jpg')`}}
            className="flex flex-row justify-between items-center w-42 md:w-46 h-28 md:h-28 text-center hover:cursor-pointer z-4 card shadow-md transform hover:scale-105 transition-transform duration-300 bg-gray-50"
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
