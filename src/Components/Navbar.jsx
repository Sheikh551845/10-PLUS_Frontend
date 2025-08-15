import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/Logo/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { AuthContext } from "../AuthPorvider";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const handleImageClick = () => setIsClicked(!isClicked);

  // Update cart count from localStorage (convert quantities to Number)
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const count = cart.reduce(
      (total, item) => total + Number(item.quantity || 1),
      0
    );
    setCartCount(count);
  };

  useEffect(() => {
    // Initial cart count load
    updateCartCount();

    // Listen to the "cartUpdated" event
    window.addEventListener("cartUpdated", updateCartCount);

    // Cleanup listener on unmount
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <div className="navbar bg-[rgba(185,28,28,0.7)] backdrop-blur-sm bg-opacity-30 fixed z-10 mt-0 text-white shadow-xl ">
      <div className="navbar-start">
        <div className="hidden md:block">
          <NavLink to="/">
            <div className="flex justify-center items-center gap-2">

              <img src={logo} alt="" className="w-7 h-7 rounded-full" />

              <p className="text-sm md:text-base font-bold">10 PLUSH</p>

            </div>
          </NavLink>
        </div>

        <div className="block md:hidden">
          <MobileMenu />
        </div>
      </div>

      <div className="navbar-center ">
        <div className="block md:hidden">
          <NavLink to="/">
            <div className="flex justify-center items-center gap-2">

              <img src={logo} alt="" className="w-7 h-7 rounded-full" />

              <p className="text-sm md:text-base font-bold">10 PLUSH</p>

            </div>
          </NavLink>
        </div>

        <div className="hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>


            <li><NavLink to="/T-Shirt">T-Shirt</NavLink></li>
            <li><NavLink to="/Panjabi">Panjabi</NavLink></li>
            <li><NavLink to="/Trouser">Trouser</NavLink></li>
            <li><NavLink to="/Cuban-Shirt">Cuban Shirt</NavLink></li>
            <li><NavLink to="/Polo">Polo</NavLink></li>
            <li><NavLink to="/Combo">Combo</NavLink></li>

            <li>
              <NavLink to="/About Us">About Us</NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-end md:mr-5 relative">
        {user && Object.keys(user).length > 0 ? (
          <div className="flex justify-center items-center gap-4 mr-3">
            {/* Your avatar and dropdown code here */}
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4 mr-1 md:mr-4">
            <NavLink to="/Login">
              <button className="text-black w-[40px] h-6 md:h-6 bg-white border-white rounded text-[10px] md:text-xs hover:cursor-pointer">
                Log In
              </button>
            </NavLink>
          </div>
        )}

        <button
          className="relative cursor-pointer"
          onClick={() => navigate("/CartInfo")}
          aria-label="Go to Cart"
        >
          <FaCartShopping className="w-7 h-7 rounded-full" />
          {cartCount > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] md:text-xs font-bold rounded-full px-1.5 md:px-2"
              style={{ minWidth: "18px", height: "18px", lineHeight: "18px", textAlign: "center" }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
