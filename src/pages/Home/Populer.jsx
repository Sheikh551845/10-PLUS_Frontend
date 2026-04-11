import React from 'react';
import Section_Title from '../../Components/Section_Title';
import { useNavigate } from 'react-router-dom';


const Populer = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Panjabi', path: '/Panjabi', img: 'https://res.cloudinary.com/djbjwoyza/image/upload/v1756822564/nyhhbwjwlzliiagxicwg.png' },
    { name: 'Trouser', path: '/Trouser', img: 'https://res.cloudinary.com/djbjwoyza/image/upload/v1755611969/i35nnfs7a1xucjf2zupe.png' },
    { name: 'Shirt', path: '/Cuban-Shirt', img: 'https://res.cloudinary.com/djbjwoyza/image/upload/v1755611969/t8rjrnoslixvksw5egxn.png' },
    { name: 'Polo', path: '/Polo', img: 'https://res.cloudinary.com/djbjwoyza/image/upload/v1755611967/zycjlvrtoxidfhhwyor0.png' },
    { name: 'T Shirt', path: '/T-Shirt', img: 'https://res.cloudinary.com/djbjwoyza/image/upload/v1755611987/na7x5l7x6edgbvgjdq3i.png' },
    { name: 'Combo', path: '/Combo', img: 'https://res.cloudinary.com/djbjwoyza/image/upload/v1755611918/jhcpzz1hhvibg0j1jyuz.png' },
    { name: 'Jersey', path: '/Jersey', img: 'https://res.cloudinary.com/djbjwoyza/image/upload/v1775746193/Gemini_Generated_Image_54aate54aate54aa-Picsart-BackgroundRemover_mdbver.png' }
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
