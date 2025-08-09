import React from 'react';
import {
  FaHome, FaTshirt, FaList
} from 'react-icons/fa';
import { PiTShirtFill } from "react-icons/pi";
import { MdNoteAdd } from 'react-icons/md';
import { BiSolidOffer } from "react-icons/bi";
import { useNavigate, NavLink } from 'react-router-dom';
import logo from "../../assets/Logo/logo.png";

const Dash_nav = () => {
  const navigate = useNavigate();

  return (
    <div className='fixed z-50 w-[10vw] min-w-[80px]'>
      <div className="flex flex-col justify-between h-screen bg-[rgba(185,28,28,0.7)] backdrop-blur-sm bg-opacity-30 shadow-xl">
        
        {/* Logo Header */}
        <div>
          <div className="flex justify-center items-center py-3 border-b border-white">
            <NavLink to="/">
              <img src={logo} alt="logo" className="w-5 h-5 md:w-7 md:h-7 rounded-full" />
            </NavLink>
          </div>

          {/* Navigation Buttons */}
          <div className='flex flex-col items-center mt-8 space-y-6'>

            <button onClick={() => navigate("/")} className="flex flex-col items-center text-white hover:text-gray-300">
              <FaHome className="text-xs md:text-base" />
              <p className="text-[10px] md:text-xs mt-1">Home</p>
            </button>

            <button onClick={() => navigate("/admin/T-shirt")} className="flex flex-col items-center text-white hover:text-gray-300">
              <FaTshirt className="text-xs md:text-base" />
              <p className="text-[10px] md:text-xs mt-1">T-shirt</p>
            </button>

            <button onClick={() => navigate("/admin/Jursey")} className="flex flex-col items-center text-white hover:text-gray-300">
              <PiTShirtFill className="text-xs md:text-base" />
              <p className="text-[10px] md:text-xs mt-1">Jursey</p>
            </button>

            <button onClick={() => navigate("/admin/Add Product")} className="flex flex-col items-center text-white hover:text-gray-300">
              <MdNoteAdd className="text-xs md:text-base" />
              <p className="text-[10px] md:text-xs mt-1">Add</p>
            </button>

            <button onClick={() => navigate("/admin/Add Offer")} className="flex flex-col items-center text-white hover:text-gray-300">
              <BiSolidOffer className="text-xs md:text-base" />
              <p className="text-[10px] md:text-xs mt-1">Offer</p>
            </button>

            <button onClick={() => navigate("/admin/Offer List")} className="flex flex-col items-center text-white hover:text-gray-300">
              <FaList className="text-xs md:text-base" />
              <p className="text-[10px] md:text-xs mt-1">List</p>
            </button>

          </div>
        </div>

        {/* Footer */}
        <div className="bg-[rgba(185,28,28,0.7)] backdrop-blur-sm w-full py-2 text-center text-white text-[8px] md:text-[10px] border-t border-white">
          <p>10 PLUS Admin</p>
          <p>© All rights reserved</p>
        </div>

      </div>
    </div>
  );
};

export default Dash_nav;
