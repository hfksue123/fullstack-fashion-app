import { IoLogoFacebook } from "react-icons/io";
import { TbBrandGithubCopilot } from "react-icons/tb";
import { AiFillInstagram } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const messages = [
  "We ship worldwide - Fast and Free.",
  "Free returns within 45 days.",
  "24/7 Customer Support available.",
];

const TopBar = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div
      className={`bg-darkColor text-white overflow-hidden ${
        visible ? "max-h-20 py-3" : "max-h-0 py-0"
      }`}
    >
      <div className="mx-auto flex justify-between items-center px-2 lg:px-4">
        {/* Left - Socials */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <a
            href="https://github.com/hfksue123"
            className="hover:text-gray-300 outline-none"
          >
            <TbBrandGithubCopilot className="h-5 w-5" />
          </a>
          <a
            href="https://www.facebook.com/hfksue123"
            className="hover:text-gray-300"
          >
            <IoLogoFacebook className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/hfksue123/"
            className="hover:text-gray-300"
          >
            <AiFillInstagram className="h-5 w-5" />
          </a>
        </div>

        {/* Center - Message */}
        <div className="text-xs lg:text-sm w-[70%] lg:w-[90%] text-center px-4">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            speed={800}
            loop={true}
            allowTouchMove={false}
            slidesPerView={1}
            className="w-full"
          >
            {messages.map((msg, index) => (
              <SwiperSlide key={index}>
                <span>{msg}</span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right - Close Button */}
        <button
          onClick={handleClose}
          className="text-white hover:text-gray-300 transform transition hover:rotate-90 duration-500"
        >
          <IoCloseSharp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
