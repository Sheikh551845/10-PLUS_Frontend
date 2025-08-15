import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      if (isOpen) {
        menuRef.current.style.maxHeight = menuRef.current.scrollHeight + "px";
        menuRef.current.style.opacity = "1";
        menuRef.current.style.transform = "translateX(0)";
      } else {
        menuRef.current.style.maxHeight = "0";
        menuRef.current.style.opacity = "0";
        menuRef.current.style.transform = "translateX(-120%)"; // hide off left
      }
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative block md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="p-1 rounded focus:outline-none"
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

      {/* Animated Slide-in Menu */}
      <ul
        ref={menuRef}
        className={`fixed top-16 left-0 w-40 bg-white backdrop-blur-md shadow-lg rounded-r-xl z-50 text-gray-800 text-sm font-medium overflow-hidden transform transition-transform duration-300 ease-in-out`}
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-120%)",
        }}
      >
        {[
          { name: "Home", path: "/" },
          { name: "T-Shirt", path: "/T-Shirt" },
          { name: "Panjabi", path: "/Panjabi" },
          { name: "Trouser", path: "/Trouser" },
          { name: "Cuban Shirt", path: "/Cuban-Shirt" },
          { name: "Polo", path: "/Polo" },
          { name: "Combo", path: "/Combo" },
          { name: "About Us", path: "/About Us" },
        ].map((item) => (
          <li key={item.name} className="border-b border-gray-200 last:border-none">
            <NavLink
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block py-3 px-6 w-full transition-all duration-200 rounded-r-lg hover:bg-gradient-to-r hover:from-[rgba(241,48,64,0.7)] hover:to-[rgba(255,128,128,0.6)] hover:text-white ${isActive ? "bg-[rgba(185,28,28,0.7)] text-white font-semibold" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

    </div>
  );
}
