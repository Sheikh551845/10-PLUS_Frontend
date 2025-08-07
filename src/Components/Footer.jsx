import React from 'react';
import logo from "../assets/Logo/logo.png";
import bg from '../assets/Background Img/footer bg.jpg';
import { FaFacebook, FaGithub, FaPhone } from "react-icons/fa";
import { FaLinkedin } from 'react-icons/fa6';
import { MdMail } from 'react-icons/md';

const Footer = () => {
  return (
    <div>
      <footer
        className="bg-base-200 bg-cover bg-center text-red-500 shadow-sm items-center px-4 py-6"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className='flex flex-row justify-between items-center w-full md:w-[80%] mx-auto gap-4'>

          {/* Left Section */}
          <div className='flex flex-col items-start gap-2 text-[clamp(10px,1.5vw,13px)]'>
            <div className="flex justify-center items-center gap-2">
              <img
                className='w-[clamp(24px,4vw,36px)] h-[clamp(24px,4vw,36px)] bg-white rounded-full'
                src={logo}
                alt="Logo"
              />
              <p className='font-bold text-[clamp(12px,2.5vw,16px)]'>10 PLUSH</p>
            </div>
            <p className='text-start leading-snug'>
              Best Quality With Best Price <br />
              Here For You
            </p>
          </div>

          {/* Right Section */}
          <div className='flex flex-col justify-center items-start gap-3 text-[clamp(10px,1.5vw,13px)]'>
            <div className='flex gap-4 justify-center text-[clamp(16px,4vw,24px)]'>
              <a href='https://github.com/Sheikh551845' target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a href='https://www.facebook.com/sheikhmohammod.asif.90' target="_blank" rel="noreferrer">
                <FaFacebook />
              </a>
              <a href='https://www.linkedin.com/in/sheikh-mohammad-zia-uddin-09860123b' target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            </div>

            <div>
              <p className='font-bold text-[clamp(14px,3vw,20px)]'>Get in Touch</p>
              <div className='flex gap-2 items-center py-1'>
                <FaPhone className='w-3 h-3' />
                <p>+8801851308413</p>
              </div>
              <div className='flex gap-2 items-center'>
                <MdMail className='w-3 h-3' />
                <p>sheikh551845@gmail.com</p>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;
