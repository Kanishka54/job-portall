import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-gray-100 text-center py-8 px-4 mt-10">
      <img src={assets.logo} alt="Logo" className="mx-auto w-32 mb-4" />
      <p className="text-gray-700 text-sm mb-4">
        Your trusted platform for finding the right job
      </p>
      <div className="flex justify-center gap-6 mt-4">
        <img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6 hover:scale-110 transition" />
        <img src={assets.twitter_icon} alt="Twitter" className="w-6 h-6 hover:scale-110 transition" />
        <img src={assets.instagram_icon} alt="Instagram" className="w-6 h-6 hover:scale-110 transition" />
      </div>
    </div>
  );
};

export default Footer;
