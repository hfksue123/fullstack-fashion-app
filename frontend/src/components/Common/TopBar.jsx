import { TbBrandMeta } from "react-icons/tb";
import { IoLogoFacebook } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

const message = ["We ship worldwide - Fast and Free."];

const TopBar = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {/* Fixed TopBar */}
      <div
      className={`bg-darkColor text-white overflow-hidden transition-all duration-500 ease-in-out ${
        visible ? "max-h-20 py-3" : "max-h-0 py-0"
      }`}
    >
        <div className=" mx-auto flex justify-between items-center px-4">
          {/* Left - Socials */}
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-gray-300">
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <IoLogoFacebook className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <AiFillInstagram className="h-5 w-5" />
            </a>
          </div>

          {/* Center - Message */}
          <div className="text-xs lg:text-sm text-center overflow-hidden">
            {message}
          </div>

          {/* Right - Close Button */}
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-300 transform transition hover:rotate-90 duration-300"
          >
            <IoCloseSharp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default TopBar;
