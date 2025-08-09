import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative block md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="p-1 rounded focus:outline-none "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Dropdown menu centered on screen */}
      {isOpen && (
        <ul
          className="fixed top-[60px] left-1/2 transform -translate-x-1/2 w-[120px] bg-[rgba(185,28,28,0.7)] backdrop-blur-sm rounded-md shadow-md z-50 text-white text-xs font-semibold"
          role="menu"
          aria-label="Mobile Navigation"
        >
          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
              className="block px-2 py-1 hover:bg-red-800 rounded"
              role="menuitem"
            >
              Home
            </NavLink>
          </li>

          <li className="px-2 py-1 cursor-default select-none border-t border-red-600">
            T-Shirt
            <ul className="mt-1 ml-2 space-y-1 text-[9px] font-normal">
              <li>
                <NavLink
                  to="/T-Shirt/Drop Shoulder"
                  onClick={closeMenu}
                  className="block px-1 py-0.5 hover:bg-red-800 rounded"
                >
                  Drop Shoulder
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/T-Shirt/V Neck"
                  onClick={closeMenu}
                  className="block px-1 py-0.5 hover:bg-red-800 rounded"
                >
                  V Neck
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/T-Shirt/Turtle Neck"
                  onClick={closeMenu}
                  className="block px-1 py-0.5 hover:bg-red-800 rounded"
                >
                  Turtle Neck
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/T-Shirt/Polo"
                  onClick={closeMenu}
                  className="block px-1 py-0.5 hover:bg-red-800 rounded"
                >
                  Polo
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="px-2 py-1 cursor-default select-none border-t border-red-600">
            Jursey
            <ul className="mt-1 ml-2 space-y-1 text-[9px] font-normal">
              <li>
                <NavLink
                  to="/Jursey/Club"
                  onClick={closeMenu}
                  className="block px-1 py-0.5 hover:bg-red-800 rounded"
                >
                  Club
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Jursey/Basic Jursey"
                  onClick={closeMenu}
                  className="block px-1 py-0.5 hover:bg-red-800 rounded"
                >
                  Basic Jursey
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="border-t border-red-600">
            <NavLink
              to="/About Us"
              onClick={closeMenu}
              className="block px-2 py-1 hover:bg-red-800 rounded"
              role="menuitem"
            >
              About Us
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}
