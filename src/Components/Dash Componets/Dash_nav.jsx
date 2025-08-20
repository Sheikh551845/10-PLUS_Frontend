// Dash_nav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { PiTShirtFill } from "react-icons/pi";
import { MdNoteAdd, MdEditDocument } from 'react-icons/md';
import logo from "../../assets/Logo/logo.png";

const Dash_nav = () => {
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center text-white hover:text-gray-300 transition-colors duration-200 ${isActive ? " border-b-1 border-white" : ""}`;

  return (
    <div className='fixed z-10 mt-0 ml-0 w-[16vw] md:w-[11vw]  '>
      <div className="flex flex-col justify-between min-h-screen h-full bg-[rgba(185,28,28,0.7)] backdrop-blur-sm bg-opacity-30 shadow-xl">
        {/* Logo */}
        <div className="flex justify-center items-center py-3 border-b border-white">
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-7 h-7 rounded-full" />
          </NavLink>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center justify-start gap-2 space-y-4  h-[75vh]">
          <NavLink to="/" className={linkClass}>
            <FaHome className="text-xs md:text-base" />
            <p className="text-[10px] md:text-xs mt-1">Home</p>
          </NavLink>

          <NavLink to="/admin/All_Product" className={linkClass}>
            <PiTShirtFill className="text-xs md:text-base" />
            <p className="text-[10px] md:text-xs mt-1">All Product</p>
          </NavLink>

          <NavLink to="/admin/Add_Product" className={linkClass}>
            <MdNoteAdd className="text-xs md:text-base" />
            <p className="text-[10px] md:text-xs mt-1">Add Product</p>
          </NavLink>

          <NavLink to="/admin/Edit_Offer" className={linkClass}>
            <MdEditDocument className="text-xs md:text-base" />
            <p className="text-[10px] md:text-xs mt-1">Edit Offer</p>
          </NavLink>

          <NavLink to="/admin/Edit_Combo" className={linkClass}>
            <MdEditDocument className="text-xs md:text-base" />
            <p className="text-[10px] md:text-xs mt-1">Edit Combo</p>
          </NavLink>

          <NavLink to="/admin/Edit_New" className={linkClass}>
            <MdEditDocument className="text-xs md:text-base" />
            <p className="text-[10px] md:text-xs mt-1">Edit New</p>
          </NavLink>

          <NavLink to="/admin/BannerManage" className={linkClass}>
            <MdEditDocument className="text-xs md:text-base" />
            <p className="text-[10px] md:text-xs mt-1">Banner</p>
          </NavLink>
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
