import React from "react";
import logo from "../assets/Logo/logo.png";

import { FaFacebook, FaGithub, FaPhone } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="w-full text-white   border-t bg-[rgba(185,28,28,0.7)]   bg-opacity-30 backdrop-blur-sm border-white/20"

    >
      {/* Overlay */}
      <div className="" />

      <div className="w-full max-w-[1200px] mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-sm sm:text-base">

        {/* Logo & Name */}


        <NavLink to="/"><div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-9 h-9 rounded-full bg-white p-1"
          />
          <h2 className="font-semibold text-lg tracking-wider">10 PLUSH</h2>
        </div></NavLink>
        {/* Slogan */}
        <p className="text-center text-xs sm:text-sm font-light opacity-90 max-w-sm leading-tight">
          Best Quality With Best Price — Here For You
        </p>

        {/* Socials + Contact */}
        <div className="flex items-center gap-6">

          {/* Social */}
          <div className="flex gap-5 text-xl">
            <a
              href="https://github.com/Sheikh551845"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white hover:scale-110 transition duration-200"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.facebook.com/sheikhmohammod.asif.90"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white hover:scale-110 transition duration-200"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/sheikh-mohammad-zia-uddin-09860123b"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white hover:scale-110 transition duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1 text-[13px]">
            <div className="flex items-center gap-2">
              <FaPhone className="w-4 h-4" />
              <a href="tel:+8801851308413" className="hover:underline">
                +8801851308413
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MdMail className="w-4 h-4" />
              <a
                href="mailto:sheikh551845@gmail.com"
                className="hover:underline"
              >
                sheikh551845@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
