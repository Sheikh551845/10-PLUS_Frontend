import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/Logo/logo.png"
import { FaCartShopping } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="navbar bg-red-500 shadow-sm fixed z-10 mt-0 text-white ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-xs dropdown-content bg-red-500 rounded-box z-1 mt-3 w-30 p-2 shadow">
            <li><NavLink to="/">Home</NavLink></li>
            <li>
              T-Shirt
              <ul className="p-2 text-white ">
                <li><NavLink to="/T-Shirt/Drop Shoulder">Drop Shoulder</NavLink></li>
                <li><NavLink to="/T-Shirt/V Neck">V Neck</NavLink></li>
                <li><NavLink to="/T-Shirt/Turtle Neck">Turtle Neck</NavLink></li>
                <li><NavLink to="/T-Shirt/Polo">Polo</NavLink></li>
              </ul>
            </li>
            <li>Jursey
              <ul className="p-2 text-white ">
                <li><NavLink to="/Jursey/Club">Club</NavLink></li>
                <li><NavLink to="Jursey/Basic Jursey">Basic Jursey</NavLink></li>
              </ul>
            </li>
            <li><NavLink to="/About Us">About Us</NavLink></li>
            <li><NavLink to="/Login">Login</NavLink></li>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-2">
           <NavLink to="/"> <img src={logo} alt="" className="w-7 h-7 rounded-full" /></NavLink>
          <p className='text-sm md:text-base font-bold'>10 PLUSH</p>
        </div>
       
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="">Home</NavLink></li>
          <li>
            <details>
              <summary>T-Shirt</summary>
              <ul className="p-2 text-black">
                <li><NavLink to="/T-Shirt/Drop Shoulder">Drop Shoulder</NavLink></li>
                <li><NavLink to="/T-Shirt/V Neck">V Neck</NavLink></li>
                <li><NavLink to="/T-Shirt/Turtle Neck">Turtle Neck</NavLink></li>
                <li><NavLink to="/T-Shirt/Polo">Polo</NavLink></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Jursey</summary>
              <ul className="p-2 text-black">
                <li><NavLink to="/Jursey/Club">Club</NavLink></li>
                <li><NavLink to="Jursey/Basic Jursey">Basic Jursey</NavLink></li>
              </ul>
            </details>

          </li>
          <li><NavLink to="/About Us">About Us</NavLink></li>
          <li><NavLink to="/Login">Login</NavLink></li>
        </ul>
      </div>
      <div className="navbar-end mr-5">
        <FaUserCircle className='w-7 h-7 rounded-full mr-5' />
        <FaCartShopping  className='w-7 h-7 rounded-full'/>
      </div>
    </div>
  );
};

export default Navbar;