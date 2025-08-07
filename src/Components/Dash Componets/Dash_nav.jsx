import React from 'react';
import { FaEdit, FaFlag, FaHome, FaRegEdit, FaTshirt, FaUser, FaUsersCog } from 'react-icons/fa';
import { FaBuildingColumns, FaBullhorn, FaList } from 'react-icons/fa6';
import logo from "../../assets/Logo/logo.png"
import { RiCoupon3Line } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import { SidebarItem } from './SidebarItem';
import { PiTShirtFill } from "react-icons/pi";
import { MdNoteAdd } from 'react-icons/md';
import { BiSolidOffer } from "react-icons/bi";

const Dash_nav = () => {
    const navigate = useNavigate()
    return (

        <div className='fixed z-50 w-[20vw]'>
            <div id="" className=" flex flex-col justify-between xl:rounded-r bg-black bg-opacity-80 h-screen">
                {/* Header */}
                <div>
                    <div className="flex bg-red-500 justify-center items-center ">
                        <NavLink to="/"> <img src={logo} alt="" className=" w-4 h-4 md:w-7 md:h-7 rounded-full" /></NavLink>
                        <p className='text-[8px] md:text-base font-bold text-white'>10 PLUSH</p>
                    </div>


                    <div className='px-1 py-1 md:px-4 md:py-4 mt-10'>
                        <div className="flex flex-col items-start border-b border-white pb-2 md:pb-5 mb-6 md:mb-10 space-y-4">
                            <button
                                className="flex items-center  space-x-1 md:space-x-3 text-white hover:text-indigo-400"
                                onClick={() => navigate("/")}
                            >
                                <FaHome className="text-[10px] md:text-base" />
                                <p className="text-[10px] md:text-base">Home</p>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col space-y-0.5 md:space-y-4">
                            <button className="flex justify-start items-center w-full  space-x-1 md:space-x-3 focus:outline-none text-white focus:text-indigo-400   rounded " onClick={() => navigate("/admin/T-shirt")}>
                                <FaTshirt className="text-[10px] md:text-lg lg:text-lg "></FaTshirt>
                                <p className="leading-4 text-[8px] md:text-lg lg:text-lg">T-shiet</p>
                            </button>

                            <button className="flex justify-start items-center w-full  space-x-1 md:space-x-3 focus:outline-none text-white focus:text-indigo-400   rounded " onClick={() => navigate("/admin/Jursey")}>
                                <PiTShirtFill className="text-[10px] md:text-lg lg:text-lg "></PiTShirtFill>
                                <p className="leading-4 text-[8px] md:text-lg lg:text-lg">Jursey</p>
                            </button>


                            <button className="flex justify-start items-center w-full  space-x-1 md:space-x-3 focus:outline-none text-white focus:text-indigo-400   rounded " onClick={() => navigate("/admin/Add Product")}>
                                <MdNoteAdd className="text-[10px] md:text-lg lg:text-lg "></MdNoteAdd >
                                <p className="leading-4 text-[8px] md:text-lg lg:text-lg">Add Product</p>
                            </button>

                            
                            <button className="flex justify-start items-center w-full  space-x-1 md:space-x-3 focus:outline-none text-white focus:text-indigo-400   rounded " onClick={() => navigate("/admin/Add Product")}>
                                <BiSolidOffer  className="text-[10px] md:text-lg lg:text-lg "></BiSolidOffer  >
                                <p className="leading-4 text-[8px] md:text-lg lg:text-lg">Add Offer</p>
                            </button>

                            <button className="flex justify-start items-center w-full  space-x-1 md:space-x-3 focus:outline-none text-white focus:text-indigo-400   rounded " onClick={() => navigate("/admin/Add Offer")}>
                                <FaList className="text-[8px] md:text-lg lg:text-lg "></FaList>
                                <p className="leading-4 text-[8px] md:text-lg lg:text-lg">Offer List</p>
                            </button>
                        </div>
                    </div>

                </div>


                {/* Footer Section */}
                <div className="bg-red-500  w-full text-[8px] md:text-[12px] text-white text-center">
                    <p className="">10 PLUS Admin</p>
                    <p>All rights reserved</p>
                </div>
            </div>

        </div>



    );
};

export default Dash_nav;