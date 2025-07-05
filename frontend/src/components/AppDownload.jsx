import React from 'react';
import { assets } from '../assets/assets';

const AppDownload = () => {
  return (
    <div className="bg-white py-16 px-6">
      <div className="  relative bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto rounded-2xl shadow-lg p-10">

        {/* Text + Store Buttons */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 leading-snug">
            Download Mobile App For <br /> Better Experience
          </h2>

          <div className="flex justify-center md:justify-start gap-5">
            <a href="#">
              <img src={assets.play_store} alt="Play Store" className="h-12 hover:scale-105 transition" />
            </a>
            <a href="#">
              <img src={assets.app_store} alt="App Store" className="h-12 hover:scale-105 transition" />
            </a>
          </div>
        </div>

        {/* App Image */}
        <div className="w-60 md:w-80 max-lg:hidden">
          <img src={assets.app_main_img} alt="App Preview" className="w-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
