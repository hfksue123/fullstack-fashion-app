import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  const totalPrice = cart?.products?.reduce((acc, product) => acc + product.price * product.quantity, 0) || 0;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-xl 
      transform transition-transform duration-300 ease-in-out flex flex-col z-50
      ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close Button */}
      <div className="flex justify-end items-center p-4">
        <button
          onClick={toggleCartDrawer}
          className="text-gray-600 hover:text-gray-900 transition"
        >
          <IoMdClose className="w-6 h-6" />
        </button>
      </div>

      {/* Cart Content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart</h2>
        {cart && cart.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-gray-500">Your cart is currently empty.</p>
        )}
      </div>

      {/* Total Price */}
      <div className="px-4 pt-2 border-t">
        {cart && cart.products?.length > 0 && (
          <>
            <div className="flex justify-between text-lg font-semibold text-gray-800 mb-2">
              <span>Total</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-200"
            >
              Proceed to Checkout
            </button>
            <p className="text-xs text-gray-500 my-2 text-center">
              Shipping, taxes, and discount codes will be calculated at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
