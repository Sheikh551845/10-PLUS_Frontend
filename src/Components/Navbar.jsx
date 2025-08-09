import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../assets/Logo/logo.png"
import { FaCartShopping } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../AuthPorvider';
import { useDropdownAutoClose } from '../Hooks/useDropdownAutoClose';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleImageClick = () => {
    setIsClicked(!isClicked);
  };
 useDropdownAutoClose();

  return (
    <div className="navbar bg-[rgba(185,28,28,0.7)]  backdrop-blur-sm bg-opacity-30 fixed z-10 mt-0 text-white shadow-xl ">
      <div className="navbar-start">
        <div className="flex justify-center items-center gap-2">
          <NavLink to="/"> <img src={logo} alt="" className="w-7 h-7 rounded-full" /></NavLink>
          <p className='text-sm md:text-base font-bold'>10 PLUSH</p>
        </div>

      </div>
      <div className="navbar-center ">


        <div className=" block md:hidden">
         <MobileMenu></MobileMenu>
        </div>

        <div className='hidden lg:flex'>
          <ul className="menu menu-horizontal px-1">
            <li><NavLink to="">Home</NavLink></li>
            <li>
              <details>
                <summary>T-Shirt</summary>
                <ul className="p-2 text-white bg-opacity-70 backdrop-blur-sm bg-gradient-to-r from-[rgba(185,28,28,0.7)] via-[rgba(153,27,27,0.7)] to-[rgba(127,29,29,0.7)]">
                  <li  className="hover:bg-white hover:text-black"><NavLink className="whitespace-nowrap flex justify-center items-center px-4 py-2"to="/T-Shirt/Drop Shoulder">Drop Shoulder</NavLink></li>
                  <li  className="hover:bg-white hover:text-black"><NavLink className="whitespace-nowrap flex justify-center items-center px-4 py-2"to="/T-Shirt/V Neck">V Neck</NavLink></li>
                  <li  className="hover:bg-white hover:text-black"><NavLink className="whitespace-nowrap flex justify-center items-center px-4 py-2"to="T-Shirt/Turtle Neck">Turtle Neck</NavLink></li>
                  <li  className="hover:bg-white hover:text-black"><NavLink className="whitespace-nowrap flex justify-center items-center px-4 py-2"to="/T-Shirt/Polo">Polo</NavLink></li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Jursey</summary>
                <ul className="p-2 text-white w-fit bg-opacity-70 backdrop-blur-sm bg-gradient-to-r from-[rgba(185,28,28,0.7)] via-[rgba(153,27,27,0.7)] to-[rgba(127,29,29,0.7)]">
                  <li className="hover:bg-white hover:text-black">
                    <NavLink
                      to="/Jursey/Club"
                      className="whitespace-nowrap flex justify-center items-center px-4 py-2"
                    >
                      Club
                    </NavLink>
                  </li>
                  <li className="hover:bg-white hover:text-black">
                    <NavLink
                      to="/Jursey/Basic Jursey"
                      className="whitespace-nowrap flex justify-center items-center px-4 py-2"
                    >
                      Basic Jursey
                    </NavLink>
                  </li>
                </ul>
              </details>



            </li>
            <li><NavLink to="/About Us">About Us</NavLink></li>


          </ul>
        </div>


      </div>
      <div className="navbar-end mr-5">
        {user && Object.keys(user).length > 0 ?
          <div className="flex justify-center items-center gap-4  mr-3">


            <div className="avatar  relative">
              <div
                className="w-6 md:w-8 rounded-full ring ring-offset-base-100 ring-offset-2 hover:cursor-pointer"
                onClick={handleImageClick}
              >
                {user?.photoURL !== null ? (
                  <img src={user.photoURL} alt="User Avatar" />
                ) : (
                  <img src="https://i.ibb.co/3MJwzX0/pngegg-1.png" alt="Default Avatar" />
                )}
              </div>

              {isClicked && (
                <div className="absolute bg-opacity-70 backdrop-blur-sm bg-gradient-to-r from-[rgba(185,28,28,0.7)] via-[rgba(153,27,27,0.7)] to-[rgba(127,29,29,0.7)] p-1 md:p-2 rounded h-[70px] w-[100px] md:h-[110px] md:w-auto top-10 left-[-30px] md:left-[-50px] flex flex-col items-center justify-center space-y-1 md:space-y-2">

                  {user?.displayName && (
                    <p className="text-white text-[10px] md:text-sm text-center leading-none">{user.displayName}</p>
                  )}

                  <button
                    className="text-black w-full h-6 md:h-10 bg-white rounded text-[10px] md:text-xs hover:cursor-pointer"
                    onClick={() => navigate("/admin")}
                  >
                    Dashboard
                  </button>

                  <button
                    className="text-black w-full h-6 md:h-10 bg-white border-white rounded text-[10px] md:text-xs hover:cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </button>

                </div>



              )}
            </div>





          </div> :

          <div className="flex justify-center items-center gap-4 mr-4">
            <NavLink to="/Login">
              <button className=" text-black w-[40px] h-6 md:h-6 bg-white border-white rounded text-[10px] md:text-xs hover:cursor-pointer">Log In</button>
            </NavLink>



          </div>
        }

        <FaCartShopping className='w-7 h-7 rounded-full hover:cursor-pointer' />
      </div>
    </div>
  );
};

export default Navbar;