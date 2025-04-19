import { useNavigate } from "react-router-dom";
import MyOrdersPage from "./MyOrdersPage";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { logout } from '../redux/slices/authSlice'; // Adjust path to your project
import { clearCart } from '../redux/slices/cartSlice';

const Profile = () => {
  // Access user from Redux store
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Handle confirmed logout
  const confirmLogout = () => {
    dispatch(logout());        // Clear auth state
    dispatch(clearCart());     // Clear cart state
    navigate("/login");        // Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          
          {/* Left section: Profile Info and Logout Button */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{user?.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{user?.email}</p>
            <button 
              onClick={() => setShowModal(true)} 
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Right section: User Orders */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              {/* Cancel button */}
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              {/* Confirm logout */}
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
