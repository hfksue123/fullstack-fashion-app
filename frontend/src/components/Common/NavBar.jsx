import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const cartItemCount = cart?.products?.length || 0;


  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  const menuItems = [
    { label: "All", path: "/" },
    { label: "Tops", path: "/collections/all?category=Tops" },
    { label: "Bottoms", path: "/collections/all?category=Bottoms" },
    { label: "Accessories", path: "/collections/all?category=Accessories" },
    { label: "Bags", path: "/collections/all?category=Bags" },
    { label: "Outers", path: "/collections/all?category=Outers" },
    { label: "Hot Sale", path: "/products/sale" },
  ];

  const getIsActive = (item) => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const isHome = item.path === "/" && location.pathname === "/";
    const isCategory =
      item.path.includes("/collections/all") &&
      location.pathname === "/collections/all" &&
      category === item.label;
    const isExactMatch = item.path === location.pathname;
    return isHome || isCategory || isExactMatch;
  };

  return (
    <>
      <nav className="fixed w-full mx-auto flex items-center justify-between px-4 lg:px-10 py-1 z-500 shadow-sm">
        {/* Logo */}
        <Link to="/" className="text-lg lg:text-3xl font-bold text-darkColor">
          HFKSUE123
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 ml-23">
          {menuItems.map((item) => {
            const isActive = getIsActive(item);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`group relative text-sm font-medium uppercase ${
                  isActive ? "text-black" : "text-darkColor hover:text-black"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute -bottom-[1px] left-0 h-[1px] bg-darkColor hoverEffect ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-darkColor px-2 py-1 rounded text-sm text-white"
            >
              Admin
            </Link>
          )}
          <Link to="/profile" className="hover:text-black" aria-label="Profile">
            <HiOutlineUser className="w-6 h-6 text-darkColor" />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
            aria-label="Cart"
          >
            <HiOutlineShoppingBag className="w-6 h-6 text-darkColor" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-mainColor text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>
          <SearchBar />
          <button
            onClick={toggleNavDrawer}
            className="md:hidden"
            aria-label="Open Menu"
          >
            <HiBars3BottomRight className="w-6 h-6 text-darkColor" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-1/3 bg-white shadow-lg z-510 transition-transform duration-300 ease-in-out ${
          navDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer} aria-label="Close Menu">
            <IoMdClose className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            {menuItems.map((item) => {
              const isActive = getIsActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={toggleNavDrawer}
                  className={`block text-darkColor ${
                    isActive ? "border-b-1 border-darkColor font-medium" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
