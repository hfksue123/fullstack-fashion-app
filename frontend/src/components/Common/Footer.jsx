import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { FaGithub, FaFacebook, FaChevronDown } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";

const Footer = () => {
  const [sectionsOpen, setSectionsOpen] = useState({
    shop: false,
    support: false,
    follow: false,
  });

  const toggleSection = (section) => {
    setSectionsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="py-8 text-sm">
      <style>
        {`
          @keyframes dropdownFade {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .dropdown-enter {
            animation: dropdownFade 0.3s ease forwards;
          }
        `}
      </style>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-4 lg:px-0">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">New</h3>
          <p className="text-gray-500 mb-2">
            Be the first to know about our latest collections and promotions.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-4">
            Sign up and get 10% off on your first purchase.
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <button
              type="submit"
              className="bg-darkColor text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-500 hoverEffect"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/** Section generator */}
        {["shop", "support", "follow"].map((section) => (
          <div key={section}>
            <div className="flex items-center justify-between md:block">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 capitalize">
                {section}
              </h3>
              <button
                onClick={() => toggleSection(section)}
                className="md:hidden text-gray-600"
              >
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    sectionsOpen[section] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>

            {section !== "follow" ? (
              <ul
                className={`space-y-2 text-gray-600 ${
                  sectionsOpen[section] ? "block dropdown-enter" : "hidden"
                } md:block`}
              >
                {section === "shop" && (
                  <>
                    <li>
                      <Link to="#" className="hover:text-gray-400">
                        Men's top Wear
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="hover:text-gray-400">
                        Women's top Wear
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="hover:text-gray-400">
                        Men's bottom Wear
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="hover:text-gray-400">
                        Women's bottom Wear
                      </Link>
                    </li>
                  </>
                )}
                {section === "support" && (
                  <>
                    <li>
                      <Link to="#" className="hover:text-gray-400">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="hover:text-gray-400">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="hover:text-gray-400">
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="hover:text-gray-400">
                        Features
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            ) : (
              <div
                className={`${
                  sectionsOpen[section] ? "block dropdown-enter" : "hidden"
                } md:block`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <a
                    href="https://github.com/hfksue123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-500"
                  >
                    <FaGithub className="h-5 w-5 text-gray-600" />
                  </a>
                  <a
                    href="https://www.facebook.com/hfksue123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-500"
                  >
                    <FaFacebook className="h-5 w-5 text-gray-600" />
                  </a>
                  <a
                    href="https://www.instagram.com/hfksue123/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-500"
                  >
                    <RiInstagramFill className="h-6 w-6 text-gray-600" />
                  </a>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">
                    <FiPhoneCall className="w-4 h-4 inline-block mr-1" />{" "}
                    0123-456-789
                  </p>
                </div>
                <p className="text-gray-600">
                  <SlLocationPin className="w-4 h-4 inline-block mr-1" /> Thu
                  Duc, HCMC
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mx-auto px-4 border-t border-gray-200 pt-6 mt-10">
        <p className="text-gray-400 text-xs text-center">
          &copy; 2025{" "}
          Designed by{" "}
          <a
            href="https://www.facebook.com/hfksue123"
            className="text-xs text-blue-400"
          >
            Bao Nguyen
          </a> | Data Provided by{" "}
          <a href="https://hades.vn/" className="text-xs text-blue-400">
            HADES
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
