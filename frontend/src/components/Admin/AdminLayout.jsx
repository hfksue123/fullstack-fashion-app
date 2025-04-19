import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Toggle Button */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
        <button className="" onClick={toggleSideBar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </div>
      {/* Overlay for mobile sidebar */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={toggleSideBar}
        ></div>
      )}
      {/* SideBar */}
      <div
        className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform 
      ${
        isSideBarOpen ? "translate-x-0" : "-translate-x-full"
      } hoverEffect md:translate-x-0 md:static md:block z-20`}
      >
        {/* SideBar */}
        <AdminSidebar/>
      </div>
      {/* Content */}
      <div className="flex-grow p-6 overflow-auto">
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;
