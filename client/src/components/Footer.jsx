import React from 'react';
import logoWhite from "../assets/logo-white.png";
import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <div className="bg-black text-slate-600 text-center w-full p-4 h-[5%] sm:h-[10%] fixed bottom-0 flex flex-col items-center justify-center">
      <img src="https://img.ws.mms.shopee.ph/7c2cc0162362d21f870d5eb6d9c4b870" className="w-auto border-2 rounded-full h-6 md:h-auto md:w-20 absolute top-14 md:top-2 left-[42%] md:left-10" alt="logo" />
      <p className='text-xs sm:text-base'>Copyright &copy; {new Date().getFullYear()} Bharat Odedara. All rights reserved.</p>
      <div className="links absolute flex gap-5 right-4 top-6">
        <Link to={"https://github.com/bodedara0101"} target="_blank" className='text-xs sm:text-base hover:text-red-600'>
          <Github size={25} />
        </Link>
        <Link to={"https://instagram.com/bodedara0101"} target="_blank" className='text-xs sm:text-base hover:text-red-600'>
          <Instagram size={25} />
        </Link>
        <Link to={"https://linkedin.com/in/bodedara0101"}  target="_blank" className='text-xs sm:text-base hover:text-red-600'>
          <Linkedin size={25} />
        </Link>
      </div>
    </div>
  );
}

export default Footer;