import React from 'react'
import { Link } from 'react-router-dom';
import { TbBrandMeta } from 'react-icons/tb';
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">New</h3>
          <p className="text-gray-500 mb-4">
            Be the first to know about our latest collections and promotions.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign Up and get 10% off on your first purchase.
          </p>

          {/* Newletter form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-l border-gray-300 rounded-l-md focus:outline-none
            focus:ring-2 focus:ring-gray-500 hoverEffect"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md
            hover:bg-gray-800 hoverEffect"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Shop link */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-400 hoverEffect">
                Men's top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400 hoverEffect">
                Women's top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400 hoverEffect">
                Men's bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400 hoverEffect">
                Women's bottom Wear
              </Link>
            </li>
          </ul>
        </div>
        {/* Support Link */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-400 hoverEffect">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400 hoverEffect">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400 hoverEffect">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400 hoverEffect">
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* Follow us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 hoverEffect"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 hoverEffect"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 hoverEffect"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>
          </div>
          <p className='text-gray-500'>Call Us</p>
          <p>
            <FiPhoneCall className='inline-block mr-2'/> 0123-456-789
          </p>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-4'>
        <p className='text-gray-500 text-sm tracking-tighter text-center'>
          &copy; 2025 Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer