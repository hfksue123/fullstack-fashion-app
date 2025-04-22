import { TbBrandMeta } from "react-icons/tb";
import { IoLogoFacebook } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";

const TopBar = () => {
  return (
    <div className="bg-darkColor text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
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
        <div className="ml-4 text-xs lg:text-sm text-center flex-grow">
          <span>We ship worldwide - Fast and reliable.</span>
        </div>
        <div className="text-sm hidden sm:block">
          <a href="tel:+01298383811" className="hover:text-gray-300">
            +1 (234) 567-897
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopBar